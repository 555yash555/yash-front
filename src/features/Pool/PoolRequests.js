import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Row, Col, Badge } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Axios from "axios";
import socket from "../../socket";

const PoolRequests = ({ pool_id }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [cards, setCards] = useState([]);

  const handleRequestAccepted = async (ind) => {
    let newMap = [];
    for (let i in requests) newMap.push(requests[i]);

    newMap[ind]["status"] = "accepted";
    setRequests(newMap);

    const config = {
      headers: {
        Authorization: `${userInfo.token}`,
      },
    };

    const { data } = await Axios.patch(
      `/api/pools/${pool_id}/request/accept`,
      { joiningUser_id: requests[ind]["user_id"] },
      config
    );

    // console.log(data)

    socket.emit('notification', { userId: requests[ind]["user_id"], message: data.message})
  };

  const handleRequestRejected = async (ind) => {
    let newMap = [];
    for (let i in requests) newMap.push(requests[i]);

    newMap[ind]["status"] = "rejected";
    setRequests(newMap);

    const config = {
      headers: {
        Authorization: `${userInfo.token}`,
      },
    };

    const { data } = await Axios.patch(
      `/api/pools/${pool_id}/request/reject`,
      { joiningUser_id: requests[ind]["user_id"] },
      config
    );
  };

  useEffect(() => {
    const x =
      requests &&
      requests.map((req, index) => {
        return (
          <Card key={req.user_id} className="p-0 mb-2">
            <Card.Body className="p-2">
              <Row>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>
                    <i class="fa-regular fa-circle-user"></i>
                    {req.user.username}
                  </span>
                  <span>
                    {req.status === "pending" ? (
                      <>
                        <i
                          class="fa-regular fa-circle-check"
                          onClick={() => handleRequestAccepted(index)}
                        ></i>
                        <i
                          class="fa-regular fa-circle-xmark"
                          onClick={() => handleRequestRejected(index)}
                        ></i>
                      </>
                    ) : req.status === "accepted" ? (
                      <Badge bg="success">Accepted</Badge>
                    ) : (
                      <Badge bg="danger">Rejected</Badge>
                    )}
                  </span>
                </div>
              </Row>
              <Row>
                <Col>
                  <i class="fa-solid fa-medal mx-2"> {req.user.merit}</i>
                </Col>
                <Col>{req.guts}</Col>
                <Col>
                  stance
                  {/* {req.stance.substring(0,5)} */}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );
      });
    setCards(x);
  }, [requests]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/pools/${pool_id}/requests`, {
      method: "GET",
      headers: {
        Authorization: `${userInfo.token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw "Error getting users list";
        }
      })
      .then((data) => {
        setLoading(false);
        setRequests(data);
        // console.log(data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        setError(error);
        // setIsError(true)
      });
  }, [pool_id, userInfo]);

  return (
    <>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      {cards}
    </>
  );
};

export default PoolRequests;

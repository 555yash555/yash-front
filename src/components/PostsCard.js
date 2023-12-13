import React, { useState } from "react";
import { Button, Col, Container, Dropdown, Modal, Row } from "react-bootstrap";
import { TbArrowBigUpLines, TbArrowBigDownLines } from "react-icons/tb";
import { FaRegClipboard } from 'react-icons/fa';
import { BsBookmark } from "react-icons/bs";
import { FaShareAlt } from "react-icons/fa";
import DoughNutChart from "./DoughNutChart";
import { HiDotsVertical } from "react-icons/hi";
import VideoPlayer from "./VideoPlayer";
import { useDispatch, useSelector } from "react-redux";
import { addLike, removeLike } from "../actions/upVoteAction";
import { bookmarkPost,removeBookmark } from "../actions/bookedMarkActions";
import { addDisLike, removeDislike } from "../actions/downVoteAction";
import { GoPrimitiveDot } from "react-icons/go";
import CommentForm from "./Comments/CommentForm";
import Comments from "./Comments/Comments";

import "./ProfileCard.css";
import AttachmentCarousel from "./corosloe";

const PostsCard = ({ townHall, showId, setShowId, live }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [modalShow, setModalShow] = useState(false);
  const userLikeExist = townHall.upvoted;
  const userBookMark= townHall.bookmarked;
  const haveUrl=townHall.source_link;
  
   
  
  const userDislikeExist = townHall.downvoted;

  const [upVoteCount, setUpVoteCount] = useState(townHall.upvotes.length);
  const [downVoteCount, setDownVoteCount] = useState(townHall.downvotes.length);
  const [thumbsUp, setThumbsUp] = useState(userLikeExist);
  const [thumbsDown, setThumbsDown] = useState(userDislikeExist);
  const [bookMark,bookMarked]=useState(userBookMark);
  const dispatch = useDispatch();

  const handleAddLike = (post_id) => {
    dispatch(removeDislike(post_id));
    setThumbsDown(false);
    setThumbsUp(true);
    dispatch(addLike(post_id));
    console.log(thumbsUp);
    setUpVoteCount(upVoteCount + 1);
    setDownVoteCount(downVoteCount - 1);
  };

  const handleAddDisLike = (post_id) => {
    dispatch(removeLike(post_id));
    setThumbsUp(false);
    setThumbsDown(true);
    dispatch(addDisLike(post_id));
    setDownVoteCount(downVoteCount + 1);
    setUpVoteCount(upVoteCount - 1);
  };

  let totalLikeAndDislikeCount =townHall.upvotes.length + townHall.downvotes.length;
  console.log(totalLikeAndDislikeCount);

  const handleShowComments = () => {
    if (showId === townHall.post_id) {
      setShowId(null);
    } else {
      setShowId(townHall.post_id);
    }
  };

  let countColor;
  if (thumbsUp) {
    countColor = "blue";
  } else if (thumbsDown) {
    countColor = "red";
  } else {
    countColor = "";
  }

  return (
    <div
      style={{
        backgroundColor: "white",
        marginBottom: "40px",
        width: "60%",
        borderRadius: "20px",
      }}
      className="shadow-lg"
      key={townHall.post_id}
    >
      <Container style={{ padding: "20px" }}>
        <Row>
          <Col xs={2}>
            <div
              style={{
                margin: "15px 0",
                display: "flex",
                alignItems: "center",
              }}
            >
              {live ? (
                <>
                  <GoPrimitiveDot
                    style={{ color: "red", margin: "0 3px" }}
                    size={20}
                  />
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "red",
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                    }}
                  >
                    Live
                  </span>
                </>
              ) : (
                ""
              )}
            </div>
          </Col>
          <Col xs={7}>
            <h3
              style={{
                fontSize: "2rem",
                textAlign: "center",
              }}
            >
              {townHall.title}
            </h3>
          </Col>
          <Col xs={3}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ fontSize: "1.3rem", marginRight: "5px" }}>
                  {townHall.user.username}
                </span>

                <div
                  className="image_container"
                  style={{ width: "45px", height: "45px" }}
                >
                  <img
                    className="user_round"
                    src={
                      townHall.user?.profile_pic ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                    }
                    alt="user"
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginRight: "3rem",
                  marginTop: "-.15rem",
                }}
              >
                
                {/* <span style={{ fontWeight: "bold", margin: "0 3px" }}>
                  {townHall.category}
                </span> */}
                
              </div>
            </div>
          </Col>
        </Row>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              borderRadius: "20px",
              height: "400px",
              width: "100%",
              display: "flex",
              paddingLeft: "40px",
              paddingTop: "20px",
              paddingBottom: "20px",
              overflow:"hidden"
            }}
          >
            <AttachmentCarousel attachments={townHall.attachments} post_id={townHall.post_id} live={live} />
          </div>
          <div style={{ height: "inherit", margin: "15px 0" }}>
            <Dropdown key={"end"} id={`dropdown-button-drop-end`} drop="end">
              <Dropdown.Toggle as={CustomToggle}>
                <HiDotsVertical size={20} />
              </Dropdown.Toggle>
              <Dropdown.Menu
                style={{
                  background: "#252627",
                  opacity: "0.7",
                }}
              >
                <Dropdown.Item
                  eventKey="1"
                  style={{ color: "white", background: "transparent" }}
                  onClick={() => setModalShow(true)}
                >
                  Report
                </Dropdown.Item>

                <Dropdown.Item
                  eventKey="2"
                  style={{ color: "white", background: "transparent" }}
                  onClick={() => setModalShow(true)}
                >
                  Alarm
                </Dropdown.Item>

                <Dropdown.Divider style={{ background: "white" }} />
                <Dropdown.Item
                  eventKey="4"
                  style={{ color: "white", background: "transparent" }}
                >
                  Block
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
        </div>
        <Row style={{ padding: "1.5rem 1.5rem" }}>
          <Col xs={3}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {thumbsUp ? (
                <Button variant="white">
                  <TbArrowBigUpLines
                    size={40}
                    style={{ color: "blue", backgroundColor: "color" }}
                  />
                </Button>
              ) : (
                <Button
                  variant="white"
                  onClick={() => {
                    handleAddLike(townHall.post_id);
                  }}
                  style={{ border: "none" }}
                >
                  <TbArrowBigUpLines size={40} />
                </Button>
              )}
              <span
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: ` ${countColor}`,
                }}
              >
                {upVoteCount}
              </span>
              {thumbsDown ? (
                <Button variant="white">
                  <TbArrowBigDownLines
                    size={40}
                    style={{ color: "red", backgroundColor: "color" }}
                  />
                </Button>
              ) : (
                <Button
                  variant="white"
                  onClick={() => {
                    handleAddDisLike(townHall.post_id);
                  }}
                  style={{ border: "none" }}
                >
                  <TbArrowBigDownLines size={40} />
                </Button>
              )}
              <div
    style={{
      width: "60px",
      height: "60px",
      display: "flex",
      alignItems: "center",
      margin: "0 10px",
    }}
  >
    <DoughNutChart
      count={upVoteCount}
      totalCount={totalLikeAndDislikeCount}
    />
  </div>
            </div>
            
            
          </Col>
          <Col xs={4}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div>
                <Button
                  style={{
                    fontSize: "1.80rem", // Adjust this value to make the button smaller
                    borderRadius: "20px", 
                    backgroundColor:"#6940aa"// Add this line to make the corners rounded
                  }}
                  onClick={handleShowComments}
                >
                  Reaction
                </Button>
              </div>
            </div>
          </Col>
          <Col
            xs={5}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>
              <a href={haveUrl} target="_blank" rel="noopener noreferrer">
  <Button variant="white" style={{ margin: "0 10px" }}>
    <FaRegClipboard size={40}  style={{color: haveUrl ? 'green' : 'black'}} />
  </Button>
</a>



              </div>
              
              <Button variant="white" style={{ margin: "0 10px" }}>
                <BsBookmark size={40} />
              </Button>
              <Button variant="white" style={{ margin: "0  10px " }}>
                <FaShareAlt size={40} />
              </Button>
            </div>
          </Col>
        </Row>
        {showId === townHall.post_id && (
          <Container style={{ margin: "10px 0" }}>
            <CommentForm post_id={townHall.post_id} reply_of_comment_id={0} />

            <div className="mt-4">
              <Comments post_id={townHall.post_id} />
            </div>
          </Container>
        )}
      </Container>
    </div>
  );
};

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <Button
    variant="white"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </Button>
));

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        style={{ background: "#df4759", color: "white" }}
      >
        <Modal.Title id="contained-modal-title-vcenter">
          Submit a Report
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          height: "30vh",
          display: "flex",
          flexDirection: "column",

          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifySelf: "flex-start",
            marginBottom: "10px",
          }}
        >
          <h6>Please select the problem with the post</h6>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {[
            "Spam",
            "Hate Speech",
            "Violence",
            "Illegal",
            "Explicit Content",
            "Offensive",
            "Personal Information",
            "Terrorism",
            "Other",
          ].map((problem) => {
            return (
              <div style={{ borderRadius: "50%" }}>
                <Button style={{ margin: "10px" }} variant="light">
                  {problem}
                </Button>
              </div>
            );
          })}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => console.log("submit clicked")}
          variant="danger"
          style={{ opacity: "0.9", fontWeight: "bold" }}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PostsCard;

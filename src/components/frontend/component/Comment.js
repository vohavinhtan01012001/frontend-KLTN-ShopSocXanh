import { Button, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import BackgroundLetterAvatars from './Avatar';
import API from '../../../API';
import Swal from 'sweetalert2';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import ReplyIcon from '@mui/icons-material/Reply';
import SendIcon from '@mui/icons-material/Send';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceAngry, faFaceGrinHearts, faFaceKissWinkHeart, faFaceSmile, faFaceSurprise, faHeart, faHeartCircleBolt, faHeartCircleCheck, faTShirt, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import TransitionsModal from './ListUserLike';

const Comment2 = ({ author, text }) => (
  <ListItem alignItems="flex-start" >
    <ListItemText
      sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', wordBreak: 'break-word', marginLeft: "50px" }}
      primary={author}
      secondary={
        <div className='d-flex'
          style={{ alignItems: "center" }}
        >
          <Typography
            variant="body2"
            sx={{ paddingLeft: "10px", fontSize: "14px", boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)", borderRadius: "100px", padding: "10px 30px", marginLeft: "15px" }}
          >{text}
          </Typography>
        </div>}
    />

  </ListItem>
);


const Comment = ({ author, text, setShowReply, commentId, setShowIcon, showIconForm, showIcon, setIcon, icons }) => {
  let countIcon1 = 0;
  let countIcon2 = 0;
  let countIcon3 = 0;
  let countIcon4 = 0;
  let countIcon5 = 0;
  let userName1 = [];
  let userName2 = [];
  let userName3 = [];
  let userName4 = [];
  let userName5 = [];

  icons.map((icon, index) => {
    if (icon.icon === 1 && commentId === icon.BinhLuanId) {
      countIcon1++;
    }
    if (icon.icon === 2 && commentId === icon.BinhLuanId) {
      countIcon2++;
    }
    if (icon.icon === 3 && commentId === icon.BinhLuanId) {
      countIcon3++;
    }
    if (icon.icon === 4 && commentId === icon.BinhLuanId) {
      countIcon4++;
    }
    if (icon.icon === 5 && commentId === icon.BinhLuanId) {
      countIcon5++;
    }
  });


  const handleIcon = (icon, commentId) => {
    setIcon({ icon: icon, commentId: commentId })
    setShowIcon(0)
  }
  return <ListItem alignItems="flex-start" >
    <ListItemText
      sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', wordBreak: 'break-word' }}
      primary={author}
      secondary={
        <div className='d-flex'
          style={{ alignItems: "center" }}
        >
          <Typography
            variant="body2"
            sx={{ paddingLeft: "10px", fontSize: "14px", boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)", borderRadius: "100px", padding: "10px 30px", marginLeft: "15px" }}
          >{text}
          </Typography>
          <div style={{ position: "relative" }}>
            <ReplyIcon onClick={() => setShowReply(commentId)}
              style={{ fontSize: "20px", margin: "0 2px 0 10px", color: "#828a90" }}
            />
            <AddReactionIcon onClick={() => { showIcon === commentId ? setShowIcon(0) : setShowIcon(commentId) }}
              style={{ fontSize: "20px", margin: "0 5px 0 10px", color: "#828a90" }}
            />
            {
              icons.map((icon, index) => {
                let dis_icon1 = "";
                let dis_icon2 = "";
                let dis_icon3 = "";
                let dis_icon4 = "";
                let dis_icon5 = "";
                if (icon.icon === 1 && commentId === icon.BinhLuanId) {
                  userName1.push(icon.NguoiDung.hoTen);
                  if (countIcon1 > 1) {
                    dis_icon1 = (
                      <>
                        <TransitionsModal title={"yêu thích"} userName={userName1} fontIcon={<FontAwesomeIcon
                          icon={faHeart}
                          color="red"
                          style={{ marginRight: "5px", fontSize: "20px" }}
                        />} />
                        <span
                          style={{
                            fontSize: "12px",
                            position: "absolute",
                            right: "5px",
                            bottom: "-15px",
                            fontWeight: "bold",
                          }}
                        >
                          {countIcon1}
                        </span>

                      </>
                    );
                    countIcon1 = 0;
                  } else if (countIcon1 === 1) {
                    dis_icon1 = (
                      <TransitionsModal title={"yêu thích"} userName={userName1} fontIcon={<FontAwesomeIcon
                        icon={faHeart}
                        color="red"
                        style={{ marginRight: "5px", fontSize: "20px" }}
                      />} />
                    );
                  }
                }

                if (icon.icon === 2 && commentId === icon.BinhLuanId) {
                  userName2.push(icon.NguoiDung.hoTen);
                  if (countIcon2 > 1) {
                    dis_icon2 = (
                      <>
                        <TransitionsModal userName={userName2} title={"like"} fontIcon={<FontAwesomeIcon
                          icon={faThumbsUp}
                          color="#0d6efd"
                          style={{ marginRight: "5px", fontSize: "20px" }}
                        />} />
                        <span
                          style={{
                            fontSize: "12px",
                            position: "absolute",
                            right: "5px",
                            bottom: "-15px",
                            fontWeight: "bold",
                          }}
                        >
                          {countIcon2}
                        </span>
                      </>
                    );
                    countIcon2 = 0;
                  } else if (countIcon2 === 1) {
                    dis_icon2 = (
                      <TransitionsModal userName={userName2} title={"like"}  fontIcon={<FontAwesomeIcon
                        icon={faThumbsUp}
                        color="#0d6efd"
                        style={{ marginRight: "5px", fontSize: "20px" }}
                      />} />
                    );
                  }
                }


                if (icon.icon === 3 && commentId === icon.BinhLuanId) {
                  userName3.push(icon.NguoiDung.hoTen);
                  if (countIcon3 > 3) {
                    dis_icon1 = (
                      <>
                        <TransitionsModal userName={userName3} title={"haha"} fontIcon={<FontAwesomeIcon
                          icon={faFaceSmile}
                          color="#b9a42a"
                          style={{ marginRight: "5px", fontSize: "20px" }}
                        />} />
                        <span
                          style={{
                            fontSize: "12px",
                            position: "absolute",
                            right: "5px",
                            bottom: "-15px",
                            fontWeight: "bold",
                          }}
                        >
                          {countIcon3}
                        </span>
                      </>
                    );
                    countIcon3 = 0;
                  } else if (countIcon3 === 1) {
                    dis_icon3 = (
                      <TransitionsModal userName={userName3} title={"haha"} fontIcon={<FontAwesomeIcon
                        icon={faFaceSmile}
                        color="#b9a42a"
                        style={{ marginRight: "5px", fontSize: "20px" }}
                      />} />
                    );
                  }
                }



                if (icon.icon === 4 && commentId === icon.BinhLuanId) {
                  userName4.push(icon.NguoiDung.hoTen);
                  if (countIcon4 > 1) {
                    dis_icon4 = (
                      <>
                        <TransitionsModal userName={userName4} title={"phẩn nộ"}    fontIcon={<FontAwesomeIcon
                          icon={faFaceAngry}
                          color="#971919"
                          style={{ marginRight: "5px", fontSize: "20px" }}
                        />} />
                        <span
                          style={{
                            fontSize: "12px",
                            position: "absolute",
                            right: "5px",
                            bottom: "-15px",
                            fontWeight: "bold",
                          }}
                        >
                          {countIcon4}
                        </span>
                      </>
                    );
                    countIcon4 = 0;
                  } else if (countIcon4 === 1) {
                    dis_icon4 = (
                      <TransitionsModal userName={userName4} title={"phẩn nộ"}  fontIcon={<FontAwesomeIcon
                        icon={faFaceAngry}
                        color="#971919"
                        style={{ marginRight: "5px", fontSize: "20px" }}
                      />} />
                    );
                  }
                }



                if (icon.icon === 5 && commentId === icon.BinhLuanId) {
                  userName5.push(icon.NguoiDung.hoTen);
                  if (countIcon5 > 1) {
                    dis_icon5 = (
                      <>
                        <TransitionsModal userName={userName5} title={"kiss"}  fontIcon={<FontAwesomeIcon
                          icon={faFaceKissWinkHeart}
                          color="#dc3545"
                          style={{ marginRight: "5px", fontSize: "20px" }}
                        />} />
                        <span
                          style={{
                            fontSize: "12px",
                            position: "absolute",
                            right: "5px",
                            bottom: "-15px",
                            fontWeight: "bold",
                          }}
                        >
                          {countIcon5}
                        </span>
                      </>
                    );
                    countIcon5 = 0;
                  } else if (countIcon5 === 1) {
                    dis_icon5 = (
                      <TransitionsModal userName={userName5} title={"kiss"}  fontIcon={<FontAwesomeIcon
                        icon={faFaceKissWinkHeart}
                        color="#dc3545"
                        style={{ marginRight: "5px", fontSize: "20px" }}
                      />} />
                    );
                  }
                }
                return <span style={{ position: "relative", bottom: "-4px" }}>
                  {dis_icon1}
                  {dis_icon2}
                  {dis_icon3}
                  {dis_icon4}
                  {dis_icon5}
                </span>

              })
            }
            {
              showIconForm &&
              <div style={{ background: "#a9c7cd", width: "250px", position: "absolute", bottom: "-10px", left: "110%", height: "50px", borderRadius: "30px" }} className='icon-form'>
                <span onClick={(e) => { handleIcon(1, commentId) }}>
                  <FontAwesomeIcon icon={faHeart} name="" style={{ fontSize: "30px", padding: "10px", color: "red" }} />
                </span>
                <span onClick={(e) => { handleIcon(2, commentId) }}>
                  <FontAwesomeIcon icon={faThumbsUp} name="" style={{ fontSize: "30px", padding: "10px", color: "#0d6efd" }} />
                </span>
                <span onClick={(e) => { handleIcon(3, commentId) }}>
                  <FontAwesomeIcon icon={faFaceSmile} name="" style={{ fontSize: "30px", padding: "10px", color: "#b9a42a" }} />
                </span>
                <span onClick={(e) => { handleIcon(4, commentId) }}>
                  <FontAwesomeIcon icon={faFaceAngry} name="" style={{ fontSize: "30px", padding: "10px", color: "#971919" }} />
                </span>
                <span onClick={(e) => { handleIcon(5, commentId) }}>
                  <FontAwesomeIcon icon={faFaceKissWinkHeart} name="" style={{ fontSize: "30px", padding: "10px", color: "#dc3545" }} />
                </span>
              </div>
            }
          </div>

        </div>}
    />

  </ListItem>
};

const CommentForm = ({ productId, authName, setRefersh, refersh }) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Thêm biến trạng thái isSubmitting
  console.log(authName);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Nếu đang submit thì không thực hiện lần nữa
    setIsSubmitting(true); // Đánh dấu là đang submit

    API({
      method: 'post',
      url: `comment/add-comment`,
      data: {
        comment: text,
        productId: productId,
      }
    }).then((res) => {
      if (res.data.status === 200) {
        setRefersh(!refersh)
        setText('');
      } else {
        Swal.fire({
          text: res.data.message,
          icon: 'warning',
          confirmButtonText: 'Đóng'
        });
      }
      setIsSubmitting(false); // Hoàn thành submit
    }).catch((error) => {
      Swal.fire({
        text: error.message,
        icon: 'warning',
        confirmButtonText: 'Đóng'
      });
      setIsSubmitting(false); // Hoàn thành submit
    });
  };
  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", justifyContent: "space-around", alignItems: "center", marginTop: "10px" }}>
      <BackgroundLetterAvatars name={authName} />
      <TextField
        label="Bình luận..."
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        fullWidth
        multiline
        rows={1}
        margin="normal"
        sx={{ marginLeft: "20px", fontSize: '16px', '& .MuiInputBase-input': { fontSize: '16px' }, '& .MuiInputLabel-formControl': { fontSize: '13px' } }}
      />
      <div>
        <Button sx={{ width: "100px", height: "40px", marginLeft: "20px" }} type="submit" disabled={isSubmitting}>
          <SendIcon style={{ fontSize: "40px" }} />
        </Button>
      </div>
    </form>
  );
};

const CommentList = ({ commentList, authName, productId, commentList2, refersh2, setRefersh2 }) => {
  const [showReply, setShowReply] = useState(0);
  const [showIcon, setShowIcon] = useState(0);
  const [text, setText] = useState('');
  const [icon, setIcon] = useState(0);
  const [icons, setIconList] = useState([])
  const [refershIcon, setRefershIcon] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (icon.icon === 0) {
      return;
    }
    API({
      method: 'post',
      url: `icon/upload-icon`,
      data: {
        icon: icon.icon,
        commentId: icon.commentId,
        productId: productId
      }
    }).then((res) => {
      if (res.data.status === 200) {
        console.log("thanh cong")
        setRefershIcon(!refershIcon)
        setShowIcon(0)
      }
    })
  }, [icon.icon, icon.commentId]);

  useEffect(() => {
    API({
      method: 'get',
      url: `icon/show-all/${productId}`,
    }).then((res) => {
      if (res.data.status === 200) {
        setIconList(res.data.icons)
      }
    })
  }, [productId, refershIcon]);


  const handleSubmit = (e, id) => {
    e.preventDefault();

    if (isSubmitting) return; // Nếu đang submit thì không thực hiện lần nữa
    setIsSubmitting(true); // Đánh dấu là đang submit

    API({
      method: 'post',
      url: `comment2/add-comment`,
      data: {
        comment: text,
        commentId: id,
        productId: productId
      }
    }).then((res) => {
      if (res.data.status === 200) {
        setRefersh2(!refersh2)
        setText('');
      } else {
        Swal.fire({
          text: res.data.message,
          icon: 'warning',
          confirmButtonText: 'Đóng'
        });
      }
      setIsSubmitting(false); // Hoàn thành submit
    }).catch((error) => {
      Swal.fire({
        text: error.message,
        icon: 'warning',
        confirmButtonText: 'Đóng'
      });
      setIsSubmitting(false); // Hoàn thành submit
    });
  };
  return <List>
    {commentList.map((comment, index) => {
      const matchingComments = commentList2.filter((c) => c.BinhLuanId === comment.id);
      const showReplyForm = showReply === comment.id;
      const showIconForm = showIcon === comment.id;

      return (
        <React.Fragment key={index}>
          <Comment
            author={<BackgroundLetterAvatars name={comment.NguoiDung.hoTen} />}
            text={comment.noiDung}
            setShowReply={setShowReply}
            setShowIcon={setShowIcon}
            commentId={comment.id}
            showIconForm={showIconForm}
            showIcon={showIcon}
            setIcon={setIcon}
            icons={icons}
            setRefershIcon={setRefershIcon}
            refershIcon={setRefershIcon}
          />

          {matchingComments.map((matchingComment, subIndex) => (
            <Comment2
              key={subIndex}
              author={<BackgroundLetterAvatars name={matchingComment.NguoiDung.hoTen} />}
              text={matchingComment.noiDung}
              setShowReply={setShowReply}
              commentId={matchingComment.id}

            />
          ))}

          {showReplyForm && (
            <form
              onSubmit={(e) => handleSubmit(e, comment.id)}
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "5px",
                marginLeft: "70px",
              }}
            >
              <BackgroundLetterAvatars name={authName} />
              <TextField
                label="Bình luận..."
                variant="outlined"
                value={text}
                onChange={(e) => setText(e.target.value)}
                fullWidth
                multiline
                rows={1}
                margin="normal"
                sx={{
                  fontSize: '16px',
                  '& .MuiInputBase-input': { fontSize: '16px' },
                  '& .MuiInputLabel-formControl': { fontSize: '13px' },
                  width: "300px",
                  marginLeft: "10px"
                }}
              />
              <div>
                <Button sx={{ width: "50px", marginLeft: "20px" }} type="submit" disabled={isSubmitting}>
                  <SendIcon style={{ fontSize: "30px" }} />
                </Button>
              </div>
            </form>
          )}

        </React.Fragment>
      );
    })}
  </List>
};

const CommentApp = ({ productId, authName }) => {
  const [refersh, setRefersh] = useState(false);
  const [refersh2, setRefersh2] = useState(false);
  const [commentList, setCommentList] = useState([])
  const [commentList2, setCommentList2] = useState([])

  useEffect(() => {
    API({
      method: "get",
      url: `comment/show-all/${productId}`
    }).then((response) => {
      setCommentList(response.data.comments)
    })
  }, [refersh, productId])

  useEffect(() => {
    API({
      method: "get",
      url: `comment2/show-all/${productId}`
    }).then((response) => {
      setCommentList2(response.data.comments2)
    })
  }, [refersh2, productId])

  return (
    <div style={{ marginTop: "30px" }}>
      <Typography variant="h4" className='product__comment' gutterBottom>
        Bình Luận
      </Typography>
      <CommentList commentList={commentList} commentList2={commentList2} refersh={refersh} productId={productId} authName={authName} setRefersh2={setRefersh2} refersh2={refersh2} />
      {authName && <CommentForm productId={productId} authName={authName} setRefersh={setRefersh} refersh={refersh} />}
    </div>
  );
};

export default CommentApp;
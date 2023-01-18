import React from "react";

function ViewPosts({ postDetails, setShowDetails }) {
  console.log("=>",postDetails.reportPosts.length);
  return (
    <div className="ViewPosts scrollbar">
      <div className="view_post_user_cont">
        <div className="view_post_user">
          <img src={postDetails.user.picture} alt="" />
          <span>{postDetails.user.username}</span>
        </div>
        <div className="closeIcon" onClick={() => setShowDetails(false)}>
          X
        </div>
      </div>
      {postDetails.images && (
        <div className="view_post_image">
          <img src={postDetails.images[0].url} alt="" />
        </div>
      )}

      {postDetails.text && (
        <div className="view_post_text">{postDetails.text}</div>
      )}
      {postDetails.reportPosts.length > 0 ? (
        <>
          <div className="View_detils_head">Reported Users</div>
          {postDetails?.reportPosts.map((rep, i) => (
            <div className="reported_users" key={i}>
              <img src={rep.id.picture} alt="" />
              <span>{rep.id.username} </span>
              <span>User ID: {rep.id._id}</span>
            </div>
          ))}
        </>
      ) : (
        <span className="view_message">No Reports</span>
      )}
      {postDetails.comments.length > 0 ? (
        <>
          <div className="View_detils_head">Comments</div>
          <div className="view_post_comments">
            <div>
              {postDetails.comments.map((cmt, i) => (
                <div className="comment_view">
                  <span>{cmt.comment}</span>
                  <div className="comment_view_user">
                    <img src={cmt.commentBy.picture} alt="" />
                    <span>{cmt.commentBy.username}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <span className="view_message">No Comments</span>
      )}
    </div>
  );
}

export default ViewPosts;

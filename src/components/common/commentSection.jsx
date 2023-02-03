const CommentSection = ({ comments, onDelete }) => {
  return (
    <div className="scroll">
      {comments.map((comment) => (
        <div key={comment.id} className={"mb-2 comment-row"}>
          <div className="row">
            <div className="col">
              <div className="font-weight-bold text-xs">{`${comment.author} - ${comment.time_created}`}</div>
              <div className="wrap-text">{comment.comment}</div>
            </div>
            <div className="col-2 text-right mr-2">
              <button
                className="btn btn-sm edit"
                onClick={() => onDelete(comment)}
              >
                <i className="fa fa-times" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;

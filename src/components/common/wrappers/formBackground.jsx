const FormBackground = (props) => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-5 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div>
                  <div className="p-5">{props.children}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormBackground;

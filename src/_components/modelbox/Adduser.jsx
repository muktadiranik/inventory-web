import React from "react";

const Adduser = () => {
  return (
    <>
      {/* Add User Modal */}
      <div id='add_user' className='modal custom-modal fade' role='dialog'>
        <div
          className='modal-dialog modal-dialog-centered modal-lg'
          role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Add User</h5>
              <button
                type='button'
                className='close'
                data-bs-dismiss='modal'
                aria-label='Close'>
                <span aria-hidden='true'>×</span>
              </button>
            </div>
            <div className='modal-body'>
              <form>
                <div className='row'>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label>
                        First Name <span className='text-danger'>*</span>
                      </label>
                      <input className='form-control' type='text' />
                    </div>
                  </div>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label>Last Name</label>
                      <input className='form-control' type='text' />
                    </div>
                  </div>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label>Address</label>
                      <input className='form-control' type='text' />
                    </div>
                  </div>

                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label>
                        Email <span className='text-danger'>*</span>
                      </label>
                      <input className='form-control' type='email' />
                    </div>
                  </div>

                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label>Phone </label>
                      <input className='form-control' type='text' />
                    </div>
                  </div>
                </div>
                <div className='submit-section'>
                  <button className='btn btn-primary submit-btn'>Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Add User Modal */}
    </>
  );
};

export default Adduser;

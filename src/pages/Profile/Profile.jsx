import React, { useState } from "react";
import { Row, Col, Card, CardBody, Alert } from "reactstrap";
// IMPORT CUSTOM STYLING
import style from "./style.module.css";

// IMPORT ASSETS
import avatarAdmin from "../../assets/images/users/avatarAdmin.png";
import avatarSurveyor from "../../assets/images/users/avatarSurveyor.png";
import avatarExecutive from "../../assets/images/users/avatarExecutive.png";
import avatarStaff from "../../assets/images/users/avatarStaff.png";

import API from "../../services";
import FormData from "form-data";

function Profile() {
  let localStorage = window.localStorage;

  // change password states
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [newPasswordCofirm, setnewPasswordCofirm] = useState("");
  const [differentPasswordAlert, setdifferentPasswordAlert] = useState(false);

  const [loading, setLoading] = useState(false);

  // state styling alert
  const [alertDifPassStatus, setalertDifPassStatus] = useState(style.alertOff);
  const [alertSuccessStatus, setalertSuccessStatus] = useState(style.alertOff);
  const [alertFailStatus, setAlertFailStatus] = useState(style.alertOff);

  const handleChangePassword = () => {
    setLoading(true);
    let formData = new FormData();
    formData.append("id", localStorage.userid);
    formData.append("password", oldPassword);
    formData.append("newpassword", newPassword);

    API.changePassword(formData)
      .then((res) => {
        if (res.data.success && res.status === 200) {
          setalertSuccessStatus(style.alertOn);
          setOldPassword("");
          setnewPassword("");
          setnewPasswordCofirm("");
          setTimeout(() => {
            setalertSuccessStatus(style.alertOff);
          }, 3000);
          // console.log("API SUCCESS : Change Password > ", res);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setAlertFailStatus(style.alertOn);
        console.error("API FAIL : Change Password > ", err.response);
      });
  };

  return (
    <div className={`page-content px-4`}>
      <div className={`${alertDifPassStatus}`}>
        <Alert color='danger'>Password tidak sama!</Alert>
      </div>
      <div className={`${alertSuccessStatus}`}>
        <Alert color='success'>Password berhasil diganti!</Alert>
      </div>
      <div className={`${alertFailStatus}`}>
        <Alert color='danger'>Password gagal diganti!</Alert>
      </div>
      <Row>
        <Col className='col-12'>
          {/* ================= Profile Head ===============  */}
          <Card>
            <CardBody>
              <div
                className={`d-flex flex-row align-items-center  ${style.profileHeadWrapper}`}
              >
                {localStorage.roleName === "admin" && (
                  <img
                    className={`rounded-circle mr-4 ${style.profilePicture}`}
                    src={avatarAdmin}
                    alt='Header Avatar'
                  />
                )}
                {localStorage.roleName === "adminsurveyor" && (
                  <img
                    className={`rounded-circle mr-4 ${style.profilePicture}`}
                    src={avatarSurveyor}
                    alt='Header Avatar'
                  />
                )}
                {localStorage.roleName === "executive" && (
                  <img
                    className={`rounded-circle mr-4 ${style.profilePicture}`}
                    src={avatarExecutive}
                    alt='Header Avatar'
                  />
                )}
                {localStorage.roleName === "staffsurveyor" && (
                  <img
                    className={`rounded-circle mr-4 ${style.profilePicture}`}
                    src={avatarStaff}
                    alt='Header Avatar'
                  />
                )}
                <div className={`d-flex flex-column`}>
                  <p className={`${style.profileRole}`}>
                    {localStorage.username} ({localStorage.roleName})
                  </p>
                  <div className='d-flex flex-column my-0'>
                    <p className={`${style.profileName} text-capitalize my-0`}>
                      {localStorage.nameUser}
                    </p>
                    <p className={`${style.profileRole} text-capitalize `}>
                      {localStorage.orgpt}
                    </p>
                  </div>
                  <p className={`${style.profileMail}`}>{localStorage.email}</p>
                </div>
              </div>
            </CardBody>
          </Card>
          {/* ================= Profile Password Change ===============  */}
          <Card>
            <CardBody className={`${style.changePasswordCard}`}>
              <p className={`${style.profilePasswordTitle}`}>EDIT PASSWORD</p>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <form>
                  <div className='form-group col-xl-4 col-lg-4 col-m-8 col-s-12 col-xs-12'>
                    <label htmlFor='currentPassword'>Current Password</label>
                    <input
                      type='password'
                      className='form-control'
                      id='currentPassword'
                      placeholder='Password'
                      value={oldPassword}
                      onChange={(e) => {
                        setOldPassword(e.target.value);
                      }}
                    />
                  </div>
                  <div className='form-group col-xl-4 col-lg-4 col-m-8 col-s-12 col-xs-12'>
                    <label htmlFor='newPassword'>New Password</label>
                    <input
                      type='password'
                      className='form-control'
                      id='newPassword'
                      placeholder='New Password'
                      value={newPassword}
                      onChange={(e) => setnewPassword(e.target.value)}
                    />
                  </div>
                  <div className='form-group col-xl-4 col-lg-4 col-m-8 col-s-12 col-xs-12'>
                    <label htmlFor='confirmNewPassword'>
                      Confirm New Password
                    </label>
                    <input
                      type='password'
                      className='form-control'
                      id='confirmNewPassword'
                      placeholder='Confirm Password'
                      value={newPasswordCofirm}
                      onChange={(e) => setnewPasswordCofirm(e.target.value)}
                    />

                    {differentPasswordAlert && (
                      <small>Password tidak sama</small>
                    )}
                  </div>
                  {newPassword !== newPasswordCofirm ? (
                    <>
                      <button
                        type='submit'
                        className={`btn ${style.buttonGantiPassword}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setalertDifPassStatus(style.alertOn);
                          setTimeout(() => {
                            setalertDifPassStatus(style.alertOff);
                          }, 3000);
                        }}
                      >
                        Ganti Password
                      </button>
                    </>
                  ) : (
                    <button
                      type='submit'
                      className={`btn ${style.buttonGantiPassword}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleChangePassword();
                      }}
                    >
                      Ganti Password
                    </button>
                  )}
                </form>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Profile;

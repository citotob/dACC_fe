import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import { Spinner } from "reactstrap";
//API
const NotifList = (props) => {
  const {
    data,
    dataClicked,
    dataNotClicked,
    setDataClicked,
    setDataNotClicked,
  } = props;
  const differenceTime = (date) => {
    var dateNow = moment(Date.now());
    const dates = moment(date);
    const diff = dateNow.diff(dates, "seconds");

    if (diff <= 60) {
      return "a moment ago";
    } else if (diff < 3600) {
      return `${(diff / 60).toFixed()} minutes ago`;
    } else if (diff <= 3600 * 24) {
      return `${(diff / 3600).toFixed()} hours ago`;
    } else if (diff <= 86400 * 30) {
      return `${(diff / 86400).toFixed()} days ago`;
    } else {
      return "long time ago";
    }
  };
  const [isLoad, setIsLoad] = useState(true);

  let history = useHistory();
  const handleClickNotif = (e, val, status) => {
    let Notif = val
      ? val.type.toLowerCase().replace(/\s+/g, "").toString()
      : "";

    if (status !== "clicked") {
      // API.putStatusNotif({ id: val.id }).catch((e) => {
      // 	alert(`${e}`);
      // 	setIsLoad(false);
      // });
    }
    // setTimeout(() => {
    //   //Notif = Type of notif
    //   if (Notif === "batchoffersubmitted") {
    //     history.push("/Pages404");
    //   }
    //   if (Notif === "newuser") {
    //     history.push("/Pages404");
    //   }
    // }, 200);
  };

  const getNotif = () => {
    setDataClicked(dataClicked);
    setDataNotClicked(dataNotClicked);
    if (data) {
      setIsLoad(false);
    }
  };

  useEffect(() => {
    if (isLoad) {
      getNotif();
    }
    return () => {};
  }, [props.dataClicked, props.dataNotClicked, data, isLoad]);

  return (
    <React.Fragment>
      {isLoad ? (
        <Spinner />
      ) : (
        dataNotClicked &&
        dataNotClicked.map((res, index) => (
          <Link key={index} to='' className='text-reset notification-item'>
            <div className='media'>
              <div
                onClick={(e) => handleClickNotif(e, res)}
                className='media-body'
              >
                <h6 className='mt-0 mb-1'>{res.from_.name}</h6>
                <div className='font-size-12 text-muted'>
                  <p className='mb-1'>{res.title}</p>
                  <p className='mb-1'>{res.message}</p>
                  <p className='mb-0'>
                    <i className='mdi mdi-clock-outline'></i>
                    {differenceTime(res.created_at)}
                    {/* {res.created_at} */}
                    {/* {res.created_at ? moment(props.from_.created_at,"YYYY/MM/DD").format("DD/MM/YY"): ""} */}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))
      )}
      {dataClicked &&
        dataClicked.map((res, index) => (
          <Link
            key={index}
            to=''
            className='text-reset notification-item clicked'
          >
            <div className='media clicked'>
              <div
                // onClick={(e) => handleClickNotif(e, res, "clicked")}
                className='media-body'
              >
                <h6 className='mt-0 mb-1'>{res.from_.name}</h6>
                <div className='font-size-12 text-muted'>
                  <p className='mb-1'>{res.title}</p>
                  <p className='mb-1'>{res.message}</p>
                  <p className='mb-0'>
                    <i className='mdi mdi-clock-outline'></i>
                    {differenceTime(res.created_at)}
                    {/* {res.created_at} */}
                    {/* {res.created_at ? moment(props.from_.created_at,"YYYY/MM/DD").format("DD/MM/YY"): ""} */}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      <div className='text-center'>
        {data && data.length === 0 ? "Tidak ada notifikasi" : ""}
      </div>
    </React.Fragment>
  );
};

export default NotifList;

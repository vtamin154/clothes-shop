import React from 'react'

const User = (props) => {
  return (
    <div className={`user ${props.active? 'active': 'non-active'}`}>
        <ul className="user__infor">
            <li><span>Họ tên: </span>{props.user.Name}</li>
            <li><span>Username: </span>{props.user.UserName}</li>
            <li><span>Email: </span>{props.user.Email}</li>
            <li><span>ID: </span>{props.user.UserID}</li>
        </ul>
    </div>
  )
}

export default User
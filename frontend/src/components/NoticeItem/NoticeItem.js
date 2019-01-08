import React from 'react';

const NoticeItem = ({num, date, title}) => {
  return (
    <tr>
      <td>{num}</td>
      <td>{date}</td>
      <td>{title}</td>
    </tr>
  );
};

export default NoticeItem;
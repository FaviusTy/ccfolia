import React from "react";
import styles from "./styles/MemoList.module.css";

const Memo = ({ text }) => <textarea defaultValue={text} />;

const MemoList = ({ items }) => (
  <div className={styles.wrap}>
    {items.map(item => (
      <Memo key={item.id} {...item} />
    ))}
  </div>
);

export default MemoList;

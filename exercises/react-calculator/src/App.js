import React, { useState, useEffect } from "react";
import "./style.css";

export default function App() {
  let [historyLen, setHistoryLen] = useState(0);
  let [historyArr, setHistoryArr] = useState([]);
  let [isSetResult, setIsSetResult] = useState(false); // 记录已计算，用于清空历史公式

  const [input, setInput] = useState("");
  const [display, setDisplay] = useState("");

  const addToInput = (key) => {
    if (isSetResult) {
      if ((/(\.\d+)!?$/.test(display) || /\.$/.test(display)) && key === ".") {
        // 存在小数点不可连续输入
        return false;
      } else if (display === "0" && /\d/.test(key)) {
        // 前置0不可连续输入
        display = "";
      }
      setInput(display + key);
      setIsSetResult(false);
    } else {
      let curInput = input;
      if (input === "" && ["-", "+", "/", "*"].includes(key)) {
        // 计算符号不可前置
        return false;
      } else if (
        /.[\-\/\*\+]+$/.test(input) &&
        ["-", "+", "/", "*"].includes(key)
      ) {
        // 计算符号不可连续增加,x先清空后续拼接
        curInput = input.replace(/[\-\/\*\+]$/, "");
      } else if (
        (/(\.\d+)!?$/.test(input) || /\.$/.test(input)) &&
        key === "."
      ) {
        // 存在小数点不可连续输入
        return false;
      } else if (
        (input === "0" || /.*[\-\/\*\+]0$/.test(input)) &&
        /\d/.test(key)
      ) {
        // 前置0不可连续输入
        let lastIndex = input.lastIndexOf("0");
        if (lastIndex !== -1) {
          curInput = curInput.substring(-1, lastIndex);
        }
      }
      setInput(curInput + key);
    }
  };

  const getResult = () => {
    let result = 0;
    try {
      result = eval(input);
      setIsSetResult(true);
      historyArr = [
        ...historyArr,
        {
          input: input.toString(),
          display: result.toString(),
        },
      ];
      setHistoryArr(historyArr);
      setHistoryLen(historyArr.length - 1);
    } catch {
      result = "错误";
    }
    setDisplay(result);
  };

  const back = () => {
    setInput(input.toString().substr(0, input.toString().length - 1));
    setIsSetResult(false);
  };

  const backward = () => {
    historyLen = historyLen - 1;
    if (historyLen <= 0) {
      historyLen = 0;
    }
    setHistoryItem(historyLen);
  };

  const forward = () => {
    historyLen = historyLen + 1;
    if (historyLen >= historyArr.length - 1) {
      historyLen = historyArr.length - 1;
    }
    setHistoryItem(historyLen);
  };

  const setHistoryItem = (len) => {
    let item = historyArr[len];
    setHistoryLen(len);
    if (item) {
      setInput(item.input);
      setDisplay(item.display);
      setIsSetResult(true);
    }
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: "#ccc",
          padding: 10,
          color: "#666",
          fontSize: 15,
        }}
      >
        <div
          style={{
            color: "#666",
            fontSize: 15,
          }}
        >
          {input || "公式"}
        </div>
        <div
          style={{
            color: "#666",
            fontWeight: "bold",
            fontSize: 30,
          }}
        >
          {display || "显示结果"}
        </div>
      </div>

      <div>
        {/* <div style={{ fontStyle: 'italic', color: '#ccc' }}>按键区</div> */}
        <div className="xcontainer">
          <div
            className="button"
            onClick={() => {
              addToInput("7");
            }}
          >
            7
          </div>
          <div
            className="button"
            onClick={() => {
              addToInput("8");
            }}
          >
            8
          </div>
          <div
            className="button"
            onClick={() => {
              addToInput("9");
            }}
          >
            9
          </div>
        </div>
        <div className="xcontainer">
          <div
            className="button"
            onClick={() => {
              addToInput("4");
            }}
          >
            4
          </div>
          <div
            className="button"
            onClick={() => {
              addToInput("5");
            }}
          >
            5
          </div>
          <div
            className="button"
            onClick={() => {
              addToInput("6");
            }}
          >
            6
          </div>
        </div>
        <div className="xcontainer">
          <div
            className="button"
            onClick={() => {
              addToInput("1");
            }}
          >
            1
          </div>
          <div
            className="button"
            onClick={() => {
              addToInput("2");
            }}
          >
            2
          </div>
          <div
            className="button"
            onClick={() => {
              addToInput("3");
            }}
          >
            3
          </div>
        </div>
        <div className="xcontainer">
          <div
            className="button"
            onClick={() => {
              addToInput("0");
            }}
          >
            0
          </div>
          <div
            className="button"
            onClick={() => {
              addToInput(".");
            }}
          >
            .
          </div>
          <div
            className="button"
            onClick={() => {
              addToInput("+");
            }}
          >
            +
          </div>
        </div>
        <div className="xcontainer">
          <div
            className="button"
            onClick={() => {
              addToInput("-");
            }}
          >
            -
          </div>
          <div
            className="button"
            onClick={() => {
              addToInput("*");
            }}
          >
            *
          </div>
          <div
            className="button"
            onClick={() => {
              addToInput("/");
            }}
          >
            /
          </div>
        </div>
        <div className="xcontainer">
          <div className="button" onClick={back}>
            退格
          </div>
          <div className="button" onClick={getResult}>
            =
          </div>
          <div
            className="button"
            onClick={() => {
              setInput("");
              setDisplay("");
              setHistoryLen(historyArr.length - 1);
              setIsSetResult(false);
            }}
          >
            C
          </div>
        </div>
        <div className="xcontainer">
          <div className="button" onClick={backward}>
            向上键
          </div>
          <div className="button" onClick={forward}>
            向下键
          </div>
        </div>
      </div>
    </div>
  );
}

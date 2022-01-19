import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Rings } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./App.css";
import CONSTANTS from "./contants";

function App() {
  const [file, setFile] = useState("");
  const [data, setData] = useState<any>({});
  const UPLOAD_DOCUMENT = async (docfile: any) => {
    const url = `${CONSTANTS.DATABASE_URL}/document/society`;
    try {
      const data = await axios.patch(url, docfile);
      console.log(
        "🚀 ~ file: App.tsx ~ line 16 ~ constUPLOAD_DOCUMENT= ~ data",
        data.data
      );
      setData(data.data);
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  function onChange(e: any) {
    setFile(e.file);
    setData({});
    const formdata = new FormData();
    formdata.append("docfile", e.file);

    const isLt2M = e.file.size / 1024 / 1024 < 8;
    if (!isLt2M) {
      alert("File must smaller than 8MB!");
      return;
    }
  }
  return (
    <div className="App">
      <h1>Resume Parser</h1>
      <Upload
        name="file"
        onChange={(e) => onChange(e)}
        customRequest={async (componentsData) => {
          let data = new FormData();
          console.log(componentsData.file, "ggg");

          data.append("docfile", componentsData.file);
          await UPLOAD_DOCUMENT(data);
        }}
        maxCount={1}
        showUploadList={{
          showDownloadIcon: true,
          downloadIcon: "download ",
          showRemoveIcon: true,
        }}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
      {Object.keys(data).length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2rem",
          }}
        >
          <Rings color="#00BFFF" height={100} width={100} />
        </div>
      ) : (
        <div>
          <h1>
            <strong>Name:</strong>
            {data.names.length !== 0 && data.names[0]}
          </h1>
          <h2>
            <strong>Email:</strong>
            {data.emails.length !== 0 && data.emails[0].value}{" "}
          </h2>
          <h2>
            <strong>Phone:</strong>
            {data.phones.length !== 0 && data.phones[0].value}{" "}
          </h2>
          <h4>
            <strong>Skill:</strong>
            {data.summary.skills}
          </h4>
        </div>
      )}
    </div>
  );
}

export default App;

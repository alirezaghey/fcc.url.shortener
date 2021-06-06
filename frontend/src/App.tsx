import dotenv from "dotenv";
dotenv.config();

function App() {
  console.log(process.env["REACT_APP_BACKEND"]);
  const postUrl = process.env["REACT_APP_BACKEND"]
    ? process.env["REACT_APP_BACKEND"] + "/api/shorturl"
    : "api/shorturl";

  return (
    <div
      style={{
        margin: "auto",
        width: "500px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1 style={{ textAlign: "center" }}>URL Shortener Micro Service</h1>
      <h2 style={{ textAlign: "center" }}>Short URL Creation</h2>
      <form
        action={postUrl}
        method="POST"
        style={{
          border: "solid 1px",
          padding: "20px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <label htmlFor="url" style={{ marginRight: "10px" }}>
          URL:
        </label>
        <input type="text" placeholder="www.example.org" name="url" id="url" />
        <button style={{ marginLeft: "5px" }}>Submit</button>
      </form>
    </div>
  );
}

export default App;

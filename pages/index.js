import Head from "next/head";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import Alert from "../components/Alert";
import { ToastContainer } from "react-toastify";

export default function Home() {
  const [list, setList] = useState([]);
  const [link, setLink] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const createLink = async () => {
    if (link === "" || link === "undefined") return setErr("Enter URL");

    if (
      link.replace(/\s/g, "").startsWith("https://") ||
      link.replace(/\s/g, "").startsWith("http://")
    ) {
      try {
        setLoading(true);
        await fetch("/api/createurl", {
          method: "POST",
          body: JSON.stringify({
            setUrl: nanoid(10),
            redirectUrl: link,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((json) => setList([...list, json]));
        setLink("");
        setErr("");
        setLoading(false);
      } catch (error) {
        setErr(error.message);
      }
    } else {
      setErr("It does not start with http,https or you forgate //");
    }
  };

  useEffect(() => {
    const { origin } = window.location;
  }, []);

  return (
    <div>
      <Head>
        <title>Url Shortner</title>
        <meta name="description" content="Shorturl" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="display-4 text-center mt-5">
          <kbd className="p-3">Url Shortner/Rename</kbd>
        </h1>
        <div className="container">
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6 mt-5">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="Paste URL"
                  aria-label="url"
                  aria-describedby="url"
                />
                <button
                  type="submit"
                  className="btn btn-outline-dark"
                  id="btn_url"
                  onClick={createLink}
                >
                  {loading === false ? "Generate" : "Wait"}
                </button>
              </div>
              {err && <p className="text-danger">{err}</p>}
              <div className="row mt-5">
                {list?.map((value, index) => {
                  return (
                    <Alert
                      value={origin + "/api/url/" + value.setUrl}
                      key={index}
                    />
                  );
                })}
              </div>
            </div>
            <div className="col-sm-3"></div>
          </div>
          <ToastContainer />
        </div>
      </main>
    </div>
  );
}

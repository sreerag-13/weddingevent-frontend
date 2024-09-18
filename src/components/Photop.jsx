import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Photop = () => {
  const [data, setData] = useState({});
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [userId, setuserId] = useState({"": sessionStorage.getItem("userId")});

  const fetchData = () => {
    axios.post("http://localhost:8082/photoprofile", { Email: sessionStorage.getItem("Email") }, {
      headers: {
        "token": sessionStorage.getItem("token"),
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      console.log(response.data);
      setData(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => { fetchData() }, []);

  return (
    <div>
      <div
        className="photographer-profile"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          backgroundColor: '#f7f7f7',
          border: '1px solid #ddd',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <img
          src={`http://localhost:8082/${data.Pimage}`}
          alt="Photographer Profile Picture"
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            marginBottom: '20px',
          }}
        />
        <div
          className="photographer-information"
          style={{
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '10px',
            }}
          >
            {data.PName}
          </h2>
          <p
            style={{
              fontSize: '18px',
              color: '#666',
              marginBottom: '20px',
            }}
          >
            {data.Description}
          </p>
          <p
            style={{
              fontSize: '16px',
              color: '#999',
              marginBottom: '20px',
            }}
          >
            {data.experience} years of experience in {data.state} and {data.City} photography.
          </p>
          <ul
            style={{
              listStyle: 'none',
              padding: '0',
              margin: '0',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <li
              style={{
                marginRight: '20px',
              }}
            >
              <a
                href="#"
                target="_blank"
                style={{
                  color: '#337ab7',
                  textDecoration: 'none',
                }}
              >
                <i
                  className="fab fa-instagram"
                  style={{
                    fontSize: '24px',
                    color: '#337ab7',
                  }}
                />
              </a>
            </li>
            <li
              style={{
                marginRight: '20px',
              }}
            >
              <a
                href="#"
                target="_blank"
                style={{
                  color: '#337ab7',
                  textDecoration: 'none',
                }}
              >
                <i
                  className="fab fa-facebook-f"
                  style={{
                    fontSize: '24px',
                    color: '#337ab7',
                  }}
                />
              </a>
            </li>
            <li
              style={{
                marginRight: '20px',
              }}
            >
              <a
                href="#"
                target="_blank"
                style={{
                  color: '#337ab7',
                  textDecoration: 'none',
                }}
              >
                <i
                  className="fab fa-twitter"
                  style={{
                    fontSize: '24px',
                    color: '#337ab7',
                  }}
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Photop;
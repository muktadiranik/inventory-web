import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Suppliers = () => {
  let data = [
    {
      id: 1,
      first_name: "Antoni",
      last_name: "Claw",
      email: "aclaw0@nih.gov",
      address: "87550 Talisman Point",
      phone: "198-720-6914",
    },
    {
      id: 2,
      first_name: "Sile",
      last_name: "De Meyer",
      email: "sdemeyer1@bigcartel.com",
      address: "463 Melvin Park",
      phone: "418-977-2071",
    },
    {
      id: 3,
      first_name: "Clo",
      last_name: "Reichartz",
      email: "creichartz2@businessinsider.com",
      address: "2 Maple Parkway",
      phone: "548-893-5912",
    },
    {
      id: 4,
      first_name: "Binni",
      last_name: "Bramall",
      email: "bbramall3@tumblr.com",
      address: "8 Sherman Avenue",
      phone: "151-120-5464",
    },
    {
      id: 5,
      first_name: "Randolf",
      last_name: "Balch",
      email: "rbalch4@forbes.com",
      address: "0 Dorton Drive",
      phone: "387-864-9461",
    },
    {
      id: 6,
      first_name: "Eddy",
      last_name: "Mosco",
      email: "emosco5@disqus.com",
      address: "65 Hayes Park",
      phone: "463-318-5451",
    },
    {
      id: 7,
      first_name: "Sandor",
      last_name: "Yexley",
      email: "syexley6@loc.gov",
      address: "2 Dryden Terrace",
      phone: "833-470-1173",
    },
    {
      id: 8,
      first_name: "Rea",
      last_name: "Aguirrezabal",
      email: "raguirrezabal7@issuu.com",
      address: "87156 Carey Street",
      phone: "669-762-3182",
    },
    {
      id: 9,
      first_name: "Neale",
      last_name: "Kirk",
      email: "nkirk8@privacy.gov.au",
      address: "90831 Oak Drive",
      phone: "402-906-8922",
    },
    {
      id: 10,
      first_name: "Jeffie",
      last_name: "Monsey",
      email: "jmonsey9@prnewswire.com",
      address: "3567 Schiller Avenue",
      phone: "816-358-1532",
    },
    {
      id: 11,
      first_name: "Rik",
      last_name: "Shortell",
      email: "rshortella@umn.edu",
      address: "9023 Ramsey Way",
      phone: "471-268-8599",
    },
    {
      id: 12,
      first_name: "Em",
      last_name: "Burgoyne",
      email: "eburgoyneb@issuu.com",
      address: "29503 Memorial Lane",
      phone: "199-871-7886",
    },
    {
      id: 13,
      first_name: "Quintus",
      last_name: "Baddow",
      email: "qbaddowc@salon.com",
      address: "492 Oneill Terrace",
      phone: "264-952-1900",
    },
    {
      id: 14,
      first_name: "Teodoor",
      last_name: "Dooland",
      email: "tdoolandd@ucoz.com",
      address: "511 Goodland Crossing",
      phone: "982-117-5329",
    },
    {
      id: 15,
      first_name: "Ernesto",
      last_name: "Curson",
      email: "ecursone@tripadvisor.com",
      address: "73399 Debra Place",
      phone: "810-183-8363",
    },
    {
      id: 16,
      first_name: "Kelvin",
      last_name: "Rosenzveig",
      email: "krosenzveigf@istockphoto.com",
      address: "93 Little Fleur Way",
      phone: "756-963-5893",
    },
    {
      id: 17,
      first_name: "Leela",
      last_name: "Faulkener",
      email: "lfaulkenerg@amazon.co.jp",
      address: "318 Weeping Birch Circle",
      phone: "269-197-6494",
    },
    {
      id: 18,
      first_name: "Rufe",
      last_name: "Sprionghall",
      email: "rsprionghallh@fda.gov",
      address: "683 Walton Alley",
      phone: "503-134-2097",
    },
    {
      id: 19,
      first_name: "Kellyann",
      last_name: "Corden",
      email: "kcordeni@google.co.uk",
      address: "0 Mosinee Road",
      phone: "783-368-4516",
    },
    {
      id: 20,
      first_name: "Berti",
      last_name: "Turpey",
      email: "bturpeyj@comcast.net",
      address: "885 Logan Junction",
      phone: "319-194-0264",
    },
  ];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const newItem = {
      id: data.length + 1,
      first_name: firstName,
      last_name: lastName,
      address: address,
      phone: phone,
    };
    data.push(newItem);
  };

  useEffect(() => {}, [data]);

  return (
    <div className='page-wrapper'>
      <div className='content container-fluid'>
        <h2>Suppliers</h2>
        {/* Page Header */}
        <div className='page-header'>
          <div className='row'>
            <div className='col'>
              <ul className='breadcrumb'>
                <li className='breadcrumb-item'>
                  <Link to='/app/main/dashboard'>Dashboard</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className='row'>
          <div className='col-md-12'>
            <div className='card mb-0'>
              <div className='card-header'>
                <h4 className='card-title mb-0'>
                  Add Supplier Personal Details
                </h4>
              </div>
              <div className='card-body'>
                <form action='#' onSubmit={onSubmitHandler}>
                  <div className='row'>
                    <div className='col-xl-12'>
                      <h4 className='card-title'>Personal Details</h4>
                      <div className='form-group row'>
                        <label className='col-lg-3 col-form-label'>
                          First Name
                        </label>
                        <div className='col-lg-9'>
                          <input
                            type='text'
                            className='form-control'
                            onChange={(event) => {
                              setFirstName(event.target.value);
                            }}
                            value={firstName}
                          />
                        </div>
                      </div>
                      <div className='form-group row'>
                        <label className='col-lg-3 col-form-label'>
                          Last Name
                        </label>
                        <div className='col-lg-9'>
                          <input
                            type='text'
                            className='form-control'
                            onChange={(event) => {
                              setLastName(event.target.value);
                            }}
                            value={lastName}
                          />
                        </div>
                      </div>
                      <div className='form-group row'>
                        <label className='col-lg-3 col-form-label'>
                          Address
                        </label>
                        <div className='col-lg-9'>
                          <input
                            type='text'
                            className='form-control'
                            onChange={(event) => {
                              setAddress(event.target.value);
                            }}
                            value={address}
                          />
                        </div>
                      </div>
                      <div className='form-group row'>
                        <label className='col-lg-3 col-form-label'>Email</label>
                        <div className='col-lg-9'>
                          <input
                            type='email'
                            className='form-control'
                            onChange={(event) => {
                              setEmail(event.target.value);
                            }}
                            value={email}
                          />
                        </div>
                      </div>
                      <div className='form-group row'>
                        <label className='col-lg-3 col-form-label'>Phone</label>
                        <div className='col-lg-9'>
                          <input
                            type='text'
                            className='form-control'
                            onChange={(event) => {
                              setPhone(event.target.value);
                            }}
                            value={phone}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='text-end'>
                    <button type='submit' className='btn btn-primary'>
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='row mt-2'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title mb-0'>Responsive Tables</h4>
            </div>
            <div className='card-body'>
              <div className='table-responsive'>
                <table className='table table-nowrap mb-0'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Address</th>
                      <th>Email</th>
                      <th>Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.first_name}</td>
                        <td>{item.last_name}</td>
                        <td>{item.address}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default Suppliers;

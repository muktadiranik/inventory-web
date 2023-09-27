import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomerList from "./CustomerList";

const Customers = () => {
  var data = [
    {
      id: 1,
      first_name: "Rolland",
      last_name: "Sambiedge",
      email: "rsambiedge0@soup.io",
      address: "70 Judy Way",
      phone: "634-338-5531",
    },
    {
      id: 2,
      first_name: "Hershel",
      last_name: "Guidone",
      email: "hguidone1@illinois.edu",
      address: "1690 Ramsey Way",
      phone: "998-909-7269",
    },
    {
      id: 3,
      first_name: "Chen",
      last_name: "MacAskill",
      email: "cmacaskill2@baidu.com",
      address: "81 Morning Hill",
      phone: "411-765-8472",
    },
    {
      id: 4,
      first_name: "Oliviero",
      last_name: "Tiley",
      email: "otiley3@nps.gov",
      address: "56923 Ohio Alley",
      phone: "818-454-5561",
    },
    {
      id: 5,
      first_name: "Heidie",
      last_name: "Guerrier",
      email: "hguerrier4@homestead.com",
      address: "52380 Nova Terrace",
      phone: "369-224-4822",
    },
    {
      id: 6,
      first_name: "Saxe",
      last_name: "Macvain",
      email: "smacvain5@merriam-webster.com",
      address: "5139 Superior Plaza",
      phone: "427-186-5939",
    },
    {
      id: 7,
      first_name: "Noland",
      last_name: "Keat",
      email: "nkeat6@squarespace.com",
      address: "92 Forest Dale Street",
      phone: "612-890-5685",
    },
    {
      id: 8,
      first_name: "Marlie",
      last_name: "Jelley",
      email: "mjelley7@cloudflare.com",
      address: "3056 Prairieview Point",
      phone: "728-104-3407",
    },
    {
      id: 9,
      first_name: "Hyacinthie",
      last_name: "Band",
      email: "hband8@mit.edu",
      address: "80 Manufacturers Place",
      phone: "370-710-2618",
    },
    {
      id: 10,
      first_name: "Murray",
      last_name: "Davitti",
      email: "mdavitti9@mozilla.org",
      address: "65576 Kim Circle",
      phone: "420-850-5912",
    },
    {
      id: 11,
      first_name: "Fey",
      last_name: "Marrow",
      email: "fmarrowa@wp.com",
      address: "9 Texas Lane",
      phone: "598-410-5804",
    },
    {
      id: 12,
      first_name: "Marmaduke",
      last_name: "Prodrick",
      email: "mprodrickb@mac.com",
      address: "80989 Mcguire Junction",
      phone: "225-387-2140",
    },
    {
      id: 13,
      first_name: "Neila",
      last_name: "Richie",
      email: "nrichiec@amazon.com",
      address: "6 Mandrake Plaza",
      phone: "382-611-4203",
    },
    {
      id: 14,
      first_name: "Turner",
      last_name: "Grieswood",
      email: "tgrieswoodd@geocities.com",
      address: "750 Stang Hill",
      phone: "844-404-7697",
    },
    {
      id: 15,
      first_name: "Hubie",
      last_name: "Bent",
      email: "hbente@posterous.com",
      address: "821 Prairieview Plaza",
      phone: "195-189-3791",
    },
    {
      id: 16,
      first_name: "Murdoch",
      last_name: "Halse",
      email: "mhalsef@state.gov",
      address: "11479 Eggendart Pass",
      phone: "384-605-4441",
    },
    {
      id: 17,
      first_name: "Con",
      last_name: "Indge",
      email: "cindgeg@ifeng.com",
      address: "18 High Crossing Center",
      phone: "433-925-7198",
    },
    {
      id: 18,
      first_name: "Mariejeanne",
      last_name: "Leving",
      email: "mlevingh@bloomberg.com",
      address: "59 Troy Park",
      phone: "861-303-7634",
    },
    {
      id: 19,
      first_name: "Coralyn",
      last_name: "Karlolczak",
      email: "ckarlolczaki@foxnews.com",
      address: "1798 Springview Court",
      phone: "772-787-7745",
    },
    {
      id: 20,
      first_name: "Alma",
      last_name: "Keirl",
      email: "akeirlj@apache.org",
      address: "51809 Warner Hill",
      phone: "941-922-9069",
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

  return (
    <div className='page-wrapper'>
      <div className='content container-fluid'>
        <h2>Customers</h2>
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
                  Add Customer Personal Details
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
        <CustomerList data={data} />
      </div>{" "}
    </div>
  );
};

export default Customers;

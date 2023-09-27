import React, { useState } from "react";

const Items = () => {
  let data = [
    {
      id: 1,
      title: "Sea Bass - Fillets",
      brand: "PhysiciansCare Dimenhydrinate",
      unit_price: 52,
      expiry_date: "08/16/2022",
    },
    {
      id: 2,
      title: "Tart Shells - Savory, 2",
      brand: "Irbesartan",
      unit_price: 47,
      expiry_date: "03/30/2022",
    },
    {
      id: 3,
      title: "Lobster - Tail 6 Oz",
      brand: "ALLEROFF",
      unit_price: 88,
      expiry_date: "07/24/2022",
    },
    {
      id: 4,
      title: "Coconut - Whole",
      brand: "ESIKA",
      unit_price: 76,
      expiry_date: "10/22/2021",
    },
    {
      id: 5,
      title: "Cucumber - Pickling Ontario",
      brand: "White Alder",
      unit_price: 2,
      expiry_date: "09/30/2021",
    },
    {
      id: 6,
      title: "Olive - Spread Tapenade",
      brand: "Dr. Sheffield Hydrocortisone Anti itch",
      unit_price: 52,
      expiry_date: "11/15/2021",
    },
    {
      id: 7,
      title: "Seaweed Green Sheets",
      brand: "Healthy Accents ibuprofen",
      unit_price: 63,
      expiry_date: "05/29/2022",
    },
    {
      id: 8,
      title: "Tea - Decaf 1 Cup",
      brand: "Zylast XP Antiseptic",
      unit_price: 73,
      expiry_date: "01/07/2022",
    },
    {
      id: 9,
      title: "Smirnoff Green Apple Twist",
      brand:
        "Pollens - Weeds and Garden Plants, Sorrel, Sheep Rumex acetosella",
      unit_price: 64,
      expiry_date: "08/01/2022",
    },
    {
      id: 10,
      title: "Island Oasis - Mango Daiquiri",
      brand: "Nitroglycerin",
      unit_price: 5,
      expiry_date: "08/29/2022",
    },
    {
      id: 11,
      title: "Muffin - Mix - Bran And Maple 15l",
      brand: "No7 Protect and Perfect Day Sunscreen Broad Spectrum SPF 15",
      unit_price: 47,
      expiry_date: "01/07/2022",
    },
    {
      id: 12,
      title: "Mcguinness - Blue Curacao",
      brand: "Natural Advantage SPF 15 All Day Moisture with AHAs",
      unit_price: 6,
      expiry_date: "09/04/2022",
    },
    {
      id: 13,
      title: "Kolrabi",
      brand: "SERTRALINE HYDROCHLORIDE",
      unit_price: 99,
      expiry_date: "06/09/2022",
    },
    {
      id: 14,
      title: "Mudslide",
      brand: "Prednisone",
      unit_price: 40,
      expiry_date: "02/15/2022",
    },
    {
      id: 15,
      title: "Pepsi, 355 Ml",
      brand: "Sunmark",
      unit_price: 77,
      expiry_date: "02/20/2022",
    },
    {
      id: 16,
      title: "Foam Cup 6 Oz",
      brand: "Acetic Acid",
      unit_price: 52,
      expiry_date: "10/13/2021",
    },
    {
      id: 17,
      title: "Bread - Multigrain",
      brand: "ampicillin",
      unit_price: 12,
      expiry_date: "05/18/2022",
    },
    {
      id: 18,
      title: "Chinese Foods - Thick Noodles",
      brand: "nitetime cold and flu",
      unit_price: 89,
      expiry_date: "08/23/2022",
    },
    {
      id: 19,
      title: "Table Cloth 90x90 Colour",
      brand: "Rouge Dior 760 Raspberry Serum",
      unit_price: 42,
      expiry_date: "06/23/2022",
    },
    {
      id: 20,
      title: "Scallops - U - 10",
      brand: "Oxygen",
      unit_price: 58,
      expiry_date: "09/19/2022",
    },
  ];

  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const newItem = {
      id: data.length + 1,
      title: title,
      brand: brand,
      unitPrice: unitPrice,
      expiryDate: expiryDate,
    };
    data.push(newItem);
  };

  return (
    <div className='page-wrapper'>
      <div className='content container-fluid'>
        <h2>Items</h2>
        <div className='card mb-0'>
          <div className='card-header'>Add Items</div>
          <div className='card-body'>
            <form action='#' onSubmit={onSubmitHandler}>
              <div className='form-group row'>
                <label className='col-form-label col-md-2'>Title</label>
                <div className='col-md-10'>
                  <input
                    type='text'
                    className='form-control form-control-lg'
                    placeholder='Title'
                    onChange={(event) => {
                      setTitle(event.target.value);
                    }}
                    value={title}
                  />
                </div>
              </div>
              <div className='form-group row'>
                <label className='col-form-label col-md-2'>Brand</label>
                <div className='col-md-10'>
                  <input
                    type='text'
                    className='form-control form-control-lg'
                    placeholder='Brand'
                    onChange={(event) => {
                      setBrand(event.target.value);
                    }}
                    value={brand}
                  />
                </div>
              </div>
              <div className='form-group row'>
                <label className='col-form-label col-md-2'>Unit Price</label>
                <div className='col-md-10'>
                  <input
                    type='text'
                    className='form-control form-control-lg'
                    placeholder='Unit Price'
                    onChange={(event) => {
                      setUnitPrice(event.target.value);
                    }}
                    value={unitPrice}
                  />
                </div>
              </div>
              <div className='form-group row'>
                <label className='col-form-label col-md-2'>Expiry Date</label>
                <div className='col-md-10'>
                  <input
                    type='date'
                    className='form-control form-control-lg'
                    placeholder='Expiry Date'
                    onChange={(event) => {
                      setExpiryDate(event.target.value);
                    }}
                    value={expiryDate}
                  />
                </div>
              </div>
              <button className=' btn btn-primary'>Add Item</button>
            </form>
          </div>
        </div>
        <div className='row mt-2'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title mb-0'>Item List</h4>
            </div>
            <div className='card-body'>
              <div className='table-responsive'>
                <table className='table table-nowrap mb-0'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Brand</th>
                      <th>Unit Price</th>
                      <th>Expiry Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.brand}</td>
                        <td>{item.unit_price}</td>
                        <td>{item.expiry_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Items;

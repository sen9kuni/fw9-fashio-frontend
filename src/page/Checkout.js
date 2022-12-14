import React from 'react'
import Navbar from '../components/Navbar'
import { Container, Row, Col, Button, Modal, Form, Alert } from 'react-bootstrap'
import dummyImage from '../assets/images/Man Suit.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import 'yup-phone';

import gopay from '../assets/images/checkout/Logo-GoPay.png'
import pos from '../assets/images/checkout/logo pos indonesia.png'
import masterCard from '../assets/images/checkout/mastercard.png'
import { FiX } from 'react-icons/fi'
import CardAddress from '../components/CardAddress'
import { getAllAddress } from '../redux/asyncActions/authCustomer'

const addressSechema  = Yup.object().shape({
  postalCode: Yup.string().min(5).required(),
  recipientPhone: Yup.string().phone('ID').required()
})

const AddressForm = ({errors, handleSubmit, handleChange})=> {
  const successMsg = useSelector((state) => state.authCustomer.successMsg)
  const errorMsg = useSelector((state) => state.authCustomer.errorMsg)
  return (
    <Form noValidate onSubmit={handleSubmit}>
      {successMsg && <Alert variant="success">{successMsg}</Alert>}
      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
        <Form.Group className="mb-3" >
          <Form.Label>Save address as (ex : home address, office address)</Form.Label>
          <Form.Control type="text" name='addressAs' placeholder="Rumah" />
        </Form.Group>
        
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" >
            <Form.Label>Recipient's name</Form.Label>
            <Form.Control type="text" name='recipientName' />
          </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" >
            <Form.Label>Recipient's telephone number</Form.Label>
            <Form.Control type="text" name='recipientPhone' />
          </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" >
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name='address' />
          </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" >
            <Form.Label>Postal code</Form.Label>
            <Form.Control type="text" name='postalCode' />
          </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" >
            <Form.Label>City or Subdistrict</Form.Label>
            <Form.Control type="text" name='city' />
          </Form.Group>
          </Col>
        </Row>
        <div className='d-flex flex-row gap-2 align-items-center mb-4'>
          <div>
            <Form.Check type='checkbox' name='checkPrimary' value='true' />
          </div>
          <div>
            <span>Make it the primary address</span>
          </div>
        </div>

        <div className='d-flex flex-row justify-content-end gap-4'>
          <Button variant='outline-secondary' className='modal-button-add-address rounded-5' >Cancel</Button>
          <Button variant='danger' className='modal-button-add-address rounded-5' type="submit">Save</Button>
        </div>
        </Form>
  )
}

function CardListProductCheckout({src, nameProduct, color, brand, price}) {
  return (
    <div className='d-flex flex-row justify-content-between align-items-center rounded shadow-sm p-4'>
            <div className='d-flex flex-row align-items-center gap-3'>
              <img src={src} alt='aaa' />
              <div className='d-flex flex-column gap-1'>
                <span className='fash-h4 fw-5'>{nameProduct} - {color}</span>
                <span className='c-dark'>{brand}</span>
              </div>
            </div>
              <span className='fash-h3 c-black'>$ {price}</span>
    </div>
  )
}

function ModalAddAddress(props){
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      // show={show}
    >
      <Modal.Header className='border-bottom-0 p-4'>
        <Button variant='close' onClick={props.onHide} />
      </Modal.Header>
      <Modal.Body className='d-flex flex-column gap-4 px-5'>
        <span className='fash-h2 text-center'>Add new address</span>
        
        {/* <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Save address as (ex : home address, office address)</Form.Label>
          <Form.Control type="text" placeholder="Rumah" />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Recipient's name</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Recipient's telephone number</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Postal code</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>City or Subdistrict</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          </Col>
        </Row>
        <div className='d-flex flex-row gap-2 align-items-center mb-4'>
          <div>
            <Form.Check type='checkbox'/>
          </div>
          <div>
            <span>Make it the primary address</span>
          </div>
        </div>

        <div className='d-flex flex-row justify-content-end gap-4'>
          <Button variant='outline-secondary' className='modal-button-add-address rounded-5' onClick={props.onHide}>Cancel</Button>
          <Button variant='danger' className='modal-button-add-address rounded-5' onClick={props.onHide}>Save</Button>
        </div>
        </Form> */}
        <Formik initialValues={{addressAs: '', recipientName: '', recipientPhone: '', address: '', postalCode: '', city: '', checkPrimary: ''}} validationSchema={addressSechema} >
            {(props)=><AddressForm {...props}/>}
          </Formik>

      </Modal.Body>
    </Modal>
  )
}

function ModalAddres(props) {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.authCustomer.token)
  const address = useSelector((state) => state.authCustomer.dataAddress)
  // console.log(address);
  React.useEffect(()=> {
    dispatch(getAllAddress(token))
  }, [])
  // console.log(address);
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className='border-bottom-0 p-4'>
        <Button variant='close' onClick={props.onHide} />
      </Modal.Header>
      <Modal.Body className='d-flex flex-column modal-checkout-height gap-4 px-5'>
        <span className='fash-h2 text-center'>Choose another address</span>
        <Button variant='outline-secondary' className='fash-border-dash-modal-checkout py-4 text-secondary' onClick={() => setModalShow(true)}>Add new address</Button>
        
        {/* <div className='d-flex flex-column p-4 gap-2 rounded shadow-sm'>
            <span className='fash-h4 fw-5 c-black'>Andreas Jane</span>
            <p className='fash-h6 c-black'>Perumahan Sapphire Mediterania, Wiradadi, Kec. Sokaraja, Kabupaten Banyumas, Jawa Tengah, 53181 [Tokopedia Note: blok c 16] Sokaraja, Kab. Banyumas, 53181</p>
            <Link to={'#'} className='fash-h4 fw-5 text-decoration-none text-danger'>Change address</Link>
        </div> */}
        {address && address.map((o) => 
          <CardAddress key={o.id} id={o.id} name={o.recepient_name} placeName={o.place_name} address={o.address} city={o.city} postalCode={o.postal_code} />
        )}
      </Modal.Body>
      <ModalAddAddress show={modalShow} onHide={() => setModalShow(false)} />
    </Modal>
  )
}

function ModalPayment(props) {
  const navigate = useNavigate()
  const onPayment = (value)=> {
    navigate('/profile/custommer/order')
  }
  return (
    <Modal
      {...props}
      // size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className='border-bottom-0 p-4 shadow-sm'>
        <div className='d-flex flex-row gap-2 align-items-center'>
          <Button className='bc-unset' variant='none' onClick={props.onHide} ><FiX size={26} /></Button>
          <span className='fash-h2'>Payment</span>
        </div>
      </Modal.Header>
      <Modal.Body className='p-0'>
        <div className='d-flex flex-column gap-4 p-4 border-bottom border-4'>
          <span className='fash-h4 fw-4'>Payment method</span>

          <div className='d-flex flex-row fash-card-Payment-chekout justify-content-between align-items-center'>
            <div className='d-flex flex-row gap-3'>
              <div className='d-flex align-items-center fash-warp-logo-payment-chekout'>
                <img className='img-fluid' src={gopay} alt='gopay' />
              </div>
            <div className='d-flex align-items-center'>
              <span>Gopay</span>
            </div>
            </div>
            <Form.Check type='radio' name='payment'/>
          </div>
          <div className='d-flex flex-row fash-card-Payment-chekout justify-content-between align-items-center'>
            <div className='d-flex flex-row gap-3'>
              <div className='d-flex align-items-center fash-warp-logo-payment-chekout'>
                <img className='img-fluid' src={pos} alt='gopay' />
              </div>
            <div className='d-flex align-items-center'>
              <span>Pos Indonesia</span>
            </div>
            </div>
            <Form.Check type='radio' name='payment'/>
          </div>
          <div className='d-flex flex-row fash-card-Payment-chekout justify-content-between align-items-center'>
            <div className='d-flex flex-row gap-3'>
              <div className='d-flex align-items-center fash-warp-logo-payment-chekout'>
                <img className='img-fluid' src={masterCard} alt='gopay' />
              </div>
            <div className='d-flex align-items-center'>
              <span>Mastercard</span>
            </div>
            </div>
            <Form.Check type='radio' name='payment'/>
          </div>

        </div>

        <div className='d-flex flex-column gap-4 p-4'>
          <span  className='fash-h4 fw-4'>Shopping summary</span>
          <div className='d-flex flex-row justify-content-between'>
            <span>Order</span>
            <span className='fash-h4 fw-4'>$ 40.0</span>
          </div>

          <div className='d-flex flex-row justify-content-between'>
            <span>Delivery</span>
            <span className='fash-h4 fw-4'>$ 5.0</span>
          </div>
        </div>

        <div className='d-flex flex-row justify-content-between p-4'>
          <div className='d-flex flex-column'>
            <span className='fash-h4 fw-4'>Shopping summary</span>
            <span className='fash-h4 fw-4'>$ 45.0</span>
          </div>
          <Button variant='danger' className='modal-button-add-address rounded-5' onClick={onPayment}>Buy</Button>
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
        aa
      </Modal.Footer> */}
    </Modal>
  )
}


function Checkout() {
  const [modalAddressShow, setModalAddressShow] = React.useState(false);
  const [modalPaymentShow, setModalPaymentShow] = React.useState(false);
  const dispatch = useDispatch()
  const token = useSelector((state) => state.authCustomer.token)
  const address = useSelector((state) => state.authCustomer.dataAddress)
  const addressChoice = useSelector((state) => state.authCustomer.addressChoice)
  React.useEffect(()=> {
    dispatch(getAllAddress(token))
  }, [])
  return (
    <>
      <Navbar />
      <Container className='checkout-container py-4 d-flex flex-row'>
        <div className='d-flex flex-row w-100 justify-content-lg-between gap-1'>
          <Col md={8} className='d-flex flex-column gap-3 fash-min-w-checkout'>
          <span className='c-black fash-h1'>Checkout</span>
          <span className='fash-h4 fw-5'>Shipping Adress</span>
          <div className='d-flex flex-column p-4 gap-2 rounded shadow-sm'>
            {/* <span className='fash-h4 fw-5 c-black'>Andreas Jane</span>
            <p className='fash-h6 c-black'>Perumahan Sapphire Mediterania, Wiradadi, Kec. Sokaraja, Kabupaten Banyumas, Jawa Tengah, 53181 [Tokopedia Note: blok c 16] Sokaraja, Kab. Banyumas, 53181</p> */}
            {/* {address && address.map((o) => {
              if (o.primary_address === true) {
                return (
                  // <CardAddress key={o.id} name={o.recepient_name} placeName={o.place_name} address={o.address} city={o.city} postalCode={o.postal_code} />
                  <>
                    <span className='fash-h4 fw-5 c-black'>{o.recepient_name}</span>
                    <p className='fash-h6 c-black'>{o.place_name}, {o.address} {o.city}, {o.postal_code}</p>
                  </>
                )
            } else {
              return null
            }
            })} */}
            { addressChoice ? addressChoice.map((o)=> {
              return (
                <CardAddress key={o.id} id={o.id} name={o.recepient_name} placeName={o.place_name} address={o.address} city={o.city} postalCode={o.postal_code} />
              )
            }) : address.map((o) => {
              if (o.primary_address === true) {
                return (
                  <CardAddress key={o.id} id={o.id} name={o.recepient_name} placeName={o.place_name} address={o.address} city={o.city} postalCode={o.postal_code} />
                )
            } else {
              return null
            }
            })}
            <Button variant='outline-secondary' className='w-50 rounded-5' onClick={() => setModalAddressShow(true)}>Choose another address</Button>
          </div>

          <CardListProductCheckout src={dummyImage} nameProduct='Mens formal suit' color='Black' brand='Zalora Cloth' price='20.0' />
          <CardListProductCheckout src={dummyImage} nameProduct='Mens formal suit' color='Black' brand='Zalora Cloth' price='20.0' />

          </Col>
          <Col md={4}>
            <div className='d-flex flex-column p-3 gap-3 rounded shadow-sm mt-md-5'>
              <span className='fash-h4 fw-5'>Shopping summary</span>
              <div className='d-flex flex-column gap-2'>
                <div className='d-flex flex-row justify-content-between'>
                  <span className='fash-h5 c-dark'>Order</span>
                  <span className='fash-h3 c-black'>$ 40.0</span>
                </div>
                <div className='d-flex flex-row justify-content-between'>
                  <span className='fash-h5 c-dark'>Delivery</span>
                  <span className='fash-h3 c-black'>$ 5.0</span>
                </div>
                <hr />
                <div className='d-flex flex-row justify-content-between'>
                  <span className='fash-h4 fw-5'>Shopping summary</span>
                  <span className='fash-h3 c-black'>$ 45.0</span>
                </div>
              </div>
                <Button variant='danger' className='fash-h6 rounded-5' onClick={() => setModalPaymentShow(true)}>Select payment</Button>
            </div>
          </Col>
        </div>
      </Container>
      <ModalAddres show={modalAddressShow} onHide={() => setModalAddressShow(false)} />
      <ModalPayment show={modalPaymentShow} onHide={() => setModalPaymentShow(false)} />
    </>
  )
}

export default Checkout
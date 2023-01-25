import  {useEffect, useState} from 'react'
// import lodash from 'lodash'
// import Modal from 'react-modal'
// import { FaTimes } from 'react-icons/fa'
// import { Button } from './components/button'
// import { Form } from './components/form'
// import logo from './images/droppe-logo.png'
// import img1 from './images/img1.png'
// import img2 from './images/img2.png'
import styles from './ShopApp.module.css'
import Header from 'components/Header'
import Banner from 'components/Banner'
import Stats from 'components/Stats'
import ProductList from 'components/Product/ProductList'
import Loader from 'components/Utility/Loader'
import useRequest from 'hooks/useRequest'
import Modal from 'components/Utility/Modal'
import Form from 'components/Form'

// export class ShopApp extends React.Component<
// {},
// { products: any[], isOpen: boolean, isShowingMessage: boolean, message: string, numFavorites: number, prodCount: number }
// > {
//   constructor (props: any) {
//     super(props)

//     this.favClick = this.favClick.bind(this)
//     this.onSubmit = this.onSubmit.bind(this)

//     this.state = { products: [], isOpen: false, isShowingMessage: false, message: '', numFavorites: 0, prodCount: 0 }

//     fetch('https://fakestoreapi.com/products').then((response) => {
//       const jsonResponse = response.json()

//       jsonResponse.then((rawData) => {
//         const data = []

//         for (let i = 0; i < rawData.length; i++) {
//           const updatedProd = rawData[i]
//           data.push(updatedProd)
//         }
//         this.setState({
//           products: data
//         })
//         this.setState({
//           prodCount: data.length
//         })
//       })
//     })
//   }

//   componentDidMount () {
//     document.title = 'Droppe refactor app'
//   }

//   favClick (title: string) {
//     const prods = this.state.products
//     const idx = lodash.findIndex(prods, { title })
//     let currentFavs = this.state.numFavorites
//     let totalFavs: any

//     if (prods[idx].isFavorite) {
//       prods[idx].isFavorite = false
//       totalFavs = --currentFavs
//     } else {
//       totalFavs = ++currentFavs
//       prods[idx].isFavorite = true
//     }

//     this.setState(() => ({ products: prods, numFavorites: totalFavs }))
//   }

//   onSubmit (payload: { title: string, description: string, price: string }) {
//     const updated = lodash.clone(this.state.products)
//     updated.push({
//       title: payload.title,
//       description: payload.description,
//       price: payload.price
//     })

//     this.setState({
//       products: updated,
//       prodCount: lodash.size(this.state.products) + 1
//     })

//     this.setState({
//       isOpen: false
//     })

//     this.setState({
//       isShowingMessage: true,
//       message: 'Adding product...'
//     })

//     // **this POST request doesn't actually post anything to any database**
//     fetch('https://fakestoreapi.com/products', {
//       method: 'POST',
//       body: JSON.stringify(
//         {
//           title: payload.title,
//           price: payload.price,
//           description: payload.description
//         }
//       )
//     })
//       .then(res => res.json())
//       .then(json => {
//         (function (t) {
//           setTimeout(() => {
//             t.setState({
//               isShowingMessage: false,
//               message: ''
//             })
//           }, 2000)
//         })(this)
//       })
//   }

//   render () {
//     const { products, isOpen } = this.state
//     return (
//       <React.Fragment>
//        <Header />
//        <Banner />

//         <div className={['container', styles.main].join(' ')} style={{ paddingTop: 0 }}>
//           <div className={styles.buttonWrapper}>
//             <span role="button">
//                <Button
//                   onClick={function (this: any) {
//                     this.setState({
//                       isOpen: true
//                     })
//                   }.bind(this)}
//                >Send product proposal</Button>
//             </span>
//              {this.state.isShowingMessage && <div className={styles.messageContainer}>
//                 <i>{this.state.message}</i>
//              </div>}
//           </div>
//           <Stats totalProducts={this.state.prodCount} favourites={this.state.numFavorites} />
//           {products && !!products.length ? <ProductList products={products} onFav={this.favClick} /> : <div></div>}
//         </div>

//         <>
//            <Modal
//               isOpen={isOpen}
//               className={styles.reactModalContent}
//               overlayClassName={styles.reactModalOverlay}
//            >
//               <div className={styles.modalContentHelper}>
//                  <div
//                     className={styles.modalClose}
//                     onClick={function (this: any) {
//                       this.setState({
//                         isOpen: false
//                       })
//                     }.bind(this)}
//                  ><FaTimes /></div>

//                  <Form
//                     on-submit={this.onSubmit}
//                  />
//               </div>
//            </Modal>
//         </>
//       </React.Fragment>
//     )
//   }
// }

export const ShopApp = () => {

  const url = 'https://fakestoreapi.com/products' // can be referenced from env or config file as well
  const { loading, error, errorMsg, data } = useRequest(url)
  const [productsData, setProductsData] = useState<any[]>([])
  const [productCount, setProductCount] = useState(0)
  const [favCount, setFavCount] = useState(0)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    setProductsData(data)
  }, [data])

  useEffect(() => {
    setProductCount(productsData.length)
  }, [productsData])

  
  const togglefav = (id: number | string) => {
    let isfav = false

    const updatedData = productsData.map((item) =>
      item.id == id
        ? {
            ...item,
            isFavourite:
							typeof item.isFavourite == 'undefined'
							  ? (isfav = true)
							  : (isfav = !item.isFavourite)
				  }
        : item
    )

    setProductsData(updatedData)
    setFavCount((prev) => (isfav ? prev + 1 : prev - 1))
  }


  const closeModal = () => { setOpenModal(false) }


  const getSubmitResponse = (error: boolean, productPayload: object) => {
    closeModal()
  }

  const modalProps = { openModal, closeModal }

  return (
    <div className='container'>
      <Header />
      <Banner />
      <Stats totalProducts={productCount} favourites={favCount} />
			<Loader isLoading={loading} />
      <ProductList products={productsData} toggleFav={togglefav} />
				{openModal && (
					<Modal {...modalProps}>
						<Form getSubmitResponse={getSubmitResponse} />
					</Modal>
				)}
    </div>
  )
}

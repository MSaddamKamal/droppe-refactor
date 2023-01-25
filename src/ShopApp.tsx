import  {useEffect, useState} from 'react'
import styles from './ShopApp.module.css'
import Header from 'components/Header'
import Banner from 'components/Banner'
import Stats from 'components/Stats'
import ProductList from 'components/Product/ProductList'
import Loader from 'components/Utility/Loader'
import useRequest from 'hooks/useRequest'
import Modal from 'components/Utility/Modal'
import Form from 'components/Form'

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

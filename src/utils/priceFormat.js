import PropTypes from "prop-types"

const PriceSplitter = ( price ) => (
  price && price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
)

PriceSplitter.propTypes = {
  price: PropTypes.number,
}

export default PriceSplitter
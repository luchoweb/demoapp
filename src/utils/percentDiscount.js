import PropTypes from "prop-types"

const PercentDiscount = ( discount, price ) => (
  Math.floor((discount) ? ( (price - discount) / price ) * 100 : 0)
)

PercentDiscount.propTypes = {
  discount: PropTypes.number,
  price: PropTypes.number
}

export default PercentDiscount
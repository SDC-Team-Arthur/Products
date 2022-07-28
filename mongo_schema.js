const productSchema = new mongoose.Schema(
  {
    product_name: {type: String, required: true},
    slogan: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    default_price: {type: String, required: true},
    features: [featureSchema],
    styles: [styleSchema],
    related_products: [
      related_item_id: Integer
    ]
  }
)

const featureSchema = new mongoose.Schema(
  {
    feature_name: {type: String, required: true},
    feature_value: {type: String, required: true}
  }
)

const styleSchema = new mongoose.Schema(
  {
    style_name: {type: String, required: true},
    sale_price: String,
    default: Boolean,
    photos: [photoSchema],
    skus: [skuSchema]
  }
)

const photosSchema = new mongoose.Schema(
  {
    photo_url: {type: String, required: true},
    thumbnail_url: {type: String, required: true}
  }
)

const skuSchema = new mongoose.Schema(
  {
    quantity: {type: Integer, required: true},
    size: {type: String, required: true}
  }
)

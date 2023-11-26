import FavoritesService from "../../services/favoritesservice.js";
const FavoritesController = {
  getFavorites: async (req, res) => {
    console.log(req.user.id);
    try {
      if (req.user.id) {
        const result = await FavoritesService.getFavorites(req.user.id);
        const data = result.map((item) => {
          return {
            idFavorite: item.id,
            id: item.product_id,
            name: item.Product.product_name,
            description: item.Product.product_description,
            price: item.Product.product_price,
            ProductCategory: item.Product.category_id,
            thumbnail: item.Product.thumbnail,
          };
        });
        console.log(data);
        res.status(200).json(data);
      }
    } catch (e) {
      console.log(e.message);
    }
  },

  addFavorites: async (req, res) => {
    try {
      if (req.user.id) {
        const result = await FavoritesService.addFavorites(
          req.user.id,
          req.body.productId
        );
        res.status(200).json({ success: true, message: "Add success" });
      }
    } catch (e) {
      console.log(e.message);
    }
  },
  deleteFavorites: async (req, res) => {
    try {
      if (req.user.id) {
        const result = await FavoritesService.deleteFavorites(
          req.user.id,
          req.params.productId
        );
        res.status(200).json({ message: "Delete success", success: true });
      }
    } catch (e) {
      console.log(e.message);
    }
  },
  getFavoriteByProductId: async (req, res) => {
    try {
      if (req.user.id) {
        const result = await FavoritesService.getFavoriteByProductId(
          req.user.id,
          req.params.productId
        );
        if (result) {
          res.status(200).json({ message: true, success: "thành công" });
        } else {
          res.status(200).json({ message: false, success: "thành công" });
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  },
  getcountFavorites: async (req, res) => {
    try {
      if (req.user.id) {
        const result = await FavoritesService.getcountFavorites(
          req.user.id,
        );
        res.status(200).json({ value: result,message: "Lấy số lượng thích thành công", success: "thành công" });
      }
    } catch (e) {
      console.log(e.message);
    }
  }
};
export default FavoritesController;

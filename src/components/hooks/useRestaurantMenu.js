import { useState, useEffect } from "react";

const useRestaurantMenu = (
  SWIGGY_MENU_API_URL,
  resId,
  RESTAURANT_TYPE_KEY,
  MENU_ITEM_TYPE_KEY
) => {
  const [restaurant, setRestaurant] = useState(null); // use useState to store restaurant data
  const [menuItems, setMenuItems] = useState([]); 
  // const [category , setcategory] = useState([])// use useState to store restaurant Menu Item data

  useEffect(() => {
    const getRestaurantInfo = async () => {
      try {
        const response = await fetch(`${SWIGGY_MENU_API_URL}${resId}`);
        if (!response.ok) {
          const err = response.status;
          throw new Error(`HTTP error! status: ${err}`);
        } else {
          const json = await response.json();
          
          // Set restaurant data
          const restaurantData =
            json?.data?.cards
              ?.map((x) => x.card)
              ?.find((x) => x && x.card["@type"] === RESTAURANT_TYPE_KEY)?.card
              ?.info || null;
          setRestaurant(restaurantData);
          
          // Set menu item data
          const menuItemsData =
            json?.data?.cards
              .find((x) => x.groupedCard)
              ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map(
                (x) => x.card?.card
              )
              ?.filter((x) => x["@type"] === MENU_ITEM_TYPE_KEY)
              ?.map((x) => x.itemCards)
              .flat()
              .map((x) => x.card?.info) || [];

          const uniqueMenuItems = [];
          menuItemsData.forEach((item) => {
            if (!uniqueMenuItems.find((x) => x.id === item.id)) {
              uniqueMenuItems.push(item);
            }
          });
          setMenuItems(uniqueMenuItems);
        }
      } catch (err) {
        setMenuItems([]);
        setRestaurant(null);
        console.error("Failed to fetch restaurant info:", err);
      }
    };

    getRestaurantInfo(); // call getRestaurantInfo function so it fetches API data and sets data in state
  }, [SWIGGY_MENU_API_URL, resId, RESTAURANT_TYPE_KEY, MENU_ITEM_TYPE_KEY]); // Add dependencies to useEffect
  return [restaurant, menuItems];
};


export default useRestaurantMenu;

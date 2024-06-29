import { shimmer_card_unit , shimmer_menu_card_unit } from "../utils/constants";

import "../styles/Shimmer.css";


// Shimmer card to display with animation
const CardShimmer = () => {
  return (
    <div className="shimmer-card">
      <div className="shimmer-img stroke animate"></div>
      <div className="shimmer-title stroke animate"></div>
      <div className="shimmer-tags stroke animate "></div>
      <div className="shimmer-details stroke animate "></div>
    </div>
  );
};

export const Shimmer = () => {
  return (
    <div className="shimmer-container">
      {new Array(shimmer_card_unit).fill(0).map((element, index) => {
        return <CardShimmer key={index} />;
      })}
    </div>
  );
};
export const MenuShimmer = () => {
  return (
    <div className="restaurant-menu">
      <div className="restaurant-summary stroke-color animate">
        <img className="shimmer-img stroke animate" alt="#" />
        <div className="restaurant-summary-details">
          <h2 className="shimmer-w40  stroke animate" ></h2>
          <p className="shimmer-w20 stroke animate"></p>
          <div className="shimmer-w60  stroke animate">
          </div>
        </div>
      </div>

      <div className="restaurant-menu-content">
        <div className="menu-items-container">
          <div className="menu-title-wrap ">
            <h3 className="shimmer-w40 stroke animate"></h3>
            <p className="shimmer-w20 stroke animate"></p>
          </div>
          <div className="menu-items-list">
            { Array(shimmer_menu_card_unit).fill("").map( (element, index)  => 
            <div className="shimmer-menu-card" key={index}>
              <div className="shimmer-item-details">
                <h3 className="shimmer-w40  stroke animate"></h3>
                <p className="shimmer-w20  stroke animate"> </p>
                <p className="shimmer-w60  stroke animate"></p>
              </div>
              <div className="shimmer-img-wrapper">
                <img className="shimmer-img stroke animate" alt=""/> 
                <div className="shimmer-btn stroke animate"> </div>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shimmer;


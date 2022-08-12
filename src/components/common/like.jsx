import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/fontawesome-free-regular";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";

//  return {this.props.solid ? <FontAwesomeIcon icon={solidHeart}/> : <FontAwesomeIcon icon={regularHeart}/>};

// input: liked: boolean
// output: onClick

// this component only toggles the state of heart icon to "full heart" or "empty heart" based on input props

const Like = (props) => {
  return (
    //console.log("liked = " + this.props.liked);
    //return <FontAwesomeIcon icon={regularHeart} />;
    //return <FontAwesomeIcon icon={solidHeart} />;
    props.liked ? (
      <span onClick={props.likeToggleClicked} style={{ cursor: "pointer" }}>
        <FontAwesomeIcon icon={solidHeart} />
      </span>
    ) : (
      <span onClick={props.likeToggleClicked} style={{ cursor: "pointer" }}>
        <FontAwesomeIcon icon={regularHeart} />
      </span>
    )
    //return <i className="fa-regular fa-heart"></i>;
  );
};

//onClick={this.props.onClick}

export default Like;

{
  /* <i class="fa-regular fa-heart"></i>
<i class="fa-solid fa-heart"></i> */
}

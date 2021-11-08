import { css } from 'lit';

export const stylesComponents = css`
  h1 {
    font-size: var(--global-h1-size);
  }

  h3 {
    font-size: var(--global-size);
  }

  .header {
    grid-area: header;
    text-align: center;
    vertical-align: middle;
  }

  .columnRuntime,
  .columnPlan,
  .columnCart {
    -webkit-box-shadow: 3px 15px 26px -3px rgba(79, 90, 125, 0.5);
    box-shadow: 3px 15px 26px -3px rgba(79, 90, 125, 0.5);
    overflow-y: auto;
    height: 85vh;
  }

  .columnRuntime {
    grid-area: columnRuntime;
  }
  .columnPlan {
    grid-area: columnPlan;
  }
  .columnCart {
    grid-area: columnCart;
  }

  /* 
  css for ListFlavors, ListVariants, ListCart
*/
  .headerList {
    background: #eaeaff none no-repeat scroll 0 0;
    height: 9vh;
    font-weight: 700;
    text-align: center;
    font-size: var(--global-size);
  }

  .sticky {
    position: sticky;
    top: 0;
  }

  .containElement {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 3px 10px;
    font-size: var(--global-size);
  }

  .containElementCart {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 3px 10px;
    font-size: var(--global-size);
  }

  .containElement:hover,
  .containElementCart:hover {
    background-color: #f6f6fb;
  }

  .alignRight {
    margin-left: auto;
  }

  /* 
  button icon
*/
  .imgAdd {
    width: var(--global-img-size);
    display: flex;
    align-items: center;
    background-color: #1395f9;
    border-radius: 50%;
  }

  .imgRemove {
    width: var(--global-img-size);
    display: flex;
    align-items: center;
    background-color: tomato;
    border-radius: 50%;
  }

  button {
    border: none;
    padding: 0;
    margin: 0;
    text-decoration: none;
    background: none;
  }

  button > img.imgAdd,
  img.imgRemove {
    transition: all 0.2s ease-in-out;
  }

  button:hover > img.imgAdd {
    box-shadow: 0px 1px 10px 0 rgba(0, 0, 0, 0.2);
    -webkit-transform: scale(1.25);
    border-radius: 50%;
    transform: scale(1.25);
    background-color: tomato;
  }

  button:focus > img.imgAdd {
    box-shadow: 0px 1px 10px 0 rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    background-color: tomato;
  }

  button:active > img.imgAdd {
    box-shadow: 0px 1px 10px 0 rgba(0, 0, 0, 0.2);
    border-radius: 50%;
  }

  button:hover > img.imgRemove {
    box-shadow: 0px 1px 10px 0 rgba(0, 0, 0, 0.2);
    -webkit-transform: scale(1.25);
    border-radius: 50%;
    transform: scale(1.25);
    background-color: #1395f9;
  }

  button:focus > img.imgRemove {
    box-shadow: 0px 1px 10px 0 rgba(0, 0, 0, 0.2);
    border-radius: 50%;
  }

  button:active > img.imgRemove {
    box-shadow: 0px 1px 10px 0 rgba(0, 0, 0, 0.2);
    border-radius: 50%;
  }

  /* 
  css for ListFlavors and ListCard
*/
  .colorElement {
    font-weight: bold;
    text-transform: uppercase;
    color: #1395f9;
  }

  .boldElement {
    font-weight: bold;
  }

  .borderElement {
    border-bottom: 1px solid #e9e9e9;
  }

  /* 
  css for listVariant and ListCard
*/
  .sizeImage {
    width: var(--global-img-runtime-size);
    padding-right: 10px;
  }

  .spaceElementVariant {
    padding-right: 3px;
  }

  .alignElement {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .alignLeft {
    margin-left: 10px;
  }
`;

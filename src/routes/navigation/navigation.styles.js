import styled from 'styled-components';
import { Link } from 'react-router-dom';


export  const NavigationContainer = styled.div`

height: 90px;
width: 100%;
display: flex;
justify-content: space-between;
padding: 0 10px 20px 5px;
`;

export const LogoContainer = styled(Link)`
      height: 100%;
      width: 70px;
      display:flex;
      justify-content:center
`
export const NavLinksContainer1 = styled.div`
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
`
export const NavLinksContainer2 = styled.div`
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
`
export const NavLink = styled(Link)`
        padding: 10px 15px;
        cursor: pointer;
`

export const NavLinkProfile = styled(Link)`
        padding: 15px 20px 10px 20px;
        cursor: pointer;
`






// .navigation {
//     height: 70px;
//     width: 100%;
//     display: flex;
//     justify-content: space-between;
//     margin-bottom: 25px;
  
//     .logo-container {
//       height: 100%;
//       width: 70px;
//       padding: 25px;
//     }
  
//     .nav-links-container {
//       width: 50%;
//       height: 100%;
//       display: flex;
//       align-items: center;
//       justify-content: flex-end;
  
//       .nav-link {
//         padding: 10px 15px;
//         cursor: pointer;
//       }
//     }
//   }
  
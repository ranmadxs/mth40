import { connect } from 'react-redux';
import { setMenuStatus as setMenuStatusAction } from '../../actions/menu/menuActions'
import { MainHeader } from '../../component/header/MainHeader'

const mapStateToProps = (state) => ({
    menu: {...state.SEARCH.Menu}
});

const mapDispatchToProps = (dispatch) => ({
    setMenuStatus: (status) => dispatch(setMenuStatusAction(status)),
});

const MenuContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainHeader);
  
export default MenuContainer;
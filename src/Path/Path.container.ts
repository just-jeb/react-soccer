import {IState} from "../store/state";
import {pathCoordinatesSelector} from "../store/selectors/field.selectors";
import {connect} from "react-redux";
import {PathComponent} from "./Path.component";


const mapStateToProps = (state: IState) => ({
    pathCoords: pathCoordinatesSelector(state)
});

export default connect(
    mapStateToProps,
)(PathComponent);
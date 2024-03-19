import http from "../http-common";

const getAll = () => {
    return http.get('/viragok');
};

/*const getFiltered=(szur)=>{
    return http.get(`/viragok/page/${szur}`);
};*/

const ViragokService={
    getAll,
    /*getFiltered,*/
}
export default ViragokService;
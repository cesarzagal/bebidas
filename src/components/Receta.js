import React,{useContext, useState} from 'react';
import {ModalContext} from '../context/ModalContext';


import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
      overflow: `scroll`
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        
    },
}));

const Receta = ({receta}) => {
    //configuracion del modal de materialui
    const [modalstyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const classes = useStyles();
    const handleOpen = ()=> {
        setOpen(true);
    }
    const handleClose = ()=>{
        setOpen(false);
    }
    const {informacion, guardarIdReceta, guardarReceta} = useContext(ModalContext);
    
    const mostrarIngredientes = informacion => {
        let ingredientes = [];
        for (let i = 1; i < 16; i++) {
            if(informacion[`strIngredient${i}`]!==null){
                ingredientes.push(
                    <li>{informacion[`strIngredient${i}`]} {informacion[`strMeasure${i}`]}</li>
                )
            }
            
        }
        return ingredientes;
    }
    return ( 
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">
                    {receta.strDrink}
                </h2>                
                <img className="card-img-top" src={receta.strDrinkThumb} alt={`imagen de ${receta.strDrink}`}/>
                <div className="card-body">
                    <button 
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={()=>{
                            guardarIdReceta(receta.idDrink);
                            handleOpen();
                        }}
                    >Ver Receta</button>
                    <Modal
                        open={open}
                        onClose={()=>{
                            guardarIdReceta(null);
                            guardarReceta({});
                            handleClose();
                        }}
                    >
                        {
                            (informacion!==null)
                            ?
                            <div style={modalstyle} className={classes.paper}>
                                <h2>{informacion.strDrink}</h2>
                                <h3 className="mt-4">Instructions</h3>
                                <p>
                                    {informacion.strInstructions}
                                </p>
                                <img src={informacion.strDrinkThumb} alt={informacion.strDrink} className="img-fluid my-4"/>
                                <h3>Ingredisntes y Cantidades</h3>
                                <ul>
                                    {mostrarIngredientes(informacion)}
                                </ul>
                            </div>

                            :null
                        }
                    </Modal>
                </div>
            </div>
            
        </div>
    );
}
 
export default Receta;
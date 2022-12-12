import React, {Component, useEffect, useState} from "react";
import { variables } from "../Variables.js";
import { Navigate } from 'react-router-dom';
import AuthUser from "../Services/AuthUser";
import GameCategory from "../Components/GameCategory"
import { Card } from "flowbite-react";
import { useNavigate } from 'react-router-dom';


export class GameCategories extends Component{

    constructor(props){
        super(props);

        this.state={
            gameCategories:[],
            modalTile:"",
            GameCategoryName:"",
            GameCategoryGameCategoryDescription:"",
            GameCategoryId:0

        }
    }

    refreshList(){
        fetch(variables.API_URL + 'gameCategories')
        .then(response => response.json())
        .then(data => {
            this.setState({gameCategories:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    changeGameCategoryName =(e)=>{
        this.setState({GameCategoryName:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Add game caategory",
            GameCategoryId:0,
            GameCategoryName:"",
            GameCategoryGameCategoryDescription:"",
        });
    }

    editClick(category){
        this.setState({
            modalTitle:"Edit game category",
            GameCategoryId:category.id,
            GameCategoryName:category.name,
            GameCategoryDescription:category.description,
        });
    }

    createClick(){
        fetch(variables.API_URL+'gameCategory',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                GameCategoryName:this.state.name,
                GameCategoryDescription:this.state.description,
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }


    updateClick(){
        fetch(variables.API_URL+'gameCategories',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                GameCategoryId:this.state.id,
                GameCategoryName:this.state.name,
                GameCategoryDescription:this.state.description,
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'gameCategories/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }

    render(){
        const {
            gameCategories,
            modalTile,
            GameCategoryId,
            GameCategoryGameCategoryDescription,
            GameCategoryName
        }= this.state;

        return(
            <div>
                <button type = "button" className="btn btn-primary m-2 float-end" data-bs-toggle="modal" data-bs-target="exampleModal" onClick={()=>this.addClick()}>
                    Add Game Category
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                GameCategoryDescription
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {gameCategories.map(categories=>
                            <tr key={categories.id}>
                                <td>{categories.id}</td>
                                <td>{categories.name}</td>
                                <td>{categories.description}</td>

                                <button type="button"
                                    className="btn btn-light mr-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="exampleModal"
                                    onClick={()=>this.editClick(categories)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                    </button>

                                    <button type="button"
                                    className="btn btn-light mr-1"
                                    onClick={()=>this.deleteClick(categories.Id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                        </svg>
                                </button>
                            </tr>
                            
                            
                            
                            )}
                    </tbody>
                </table>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal0dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTile}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">

                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Game category name</span>
                                    <input type="text" className="form-control"
                                    value={GameCategoryName}
                                    onChange={this.changeGameCategoryName}/>
                                </div>

                                {GameCategoryId===0?
                                <button type ="button" className="btn btn-primary float-start">
                                    Create
                                </button>
                                :null}

                                {GameCategoryId!==0?
                                <button type ="button" className="btn btn-primary float-start">
                                    Update
                                </button>
                                :null}


                            </div>
                        </div>
                    </div>
                </div>




            </div>
        )
    }
}
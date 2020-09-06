import React, { Component } from 'react'
import { Icon, Menu, Button, Sidebar } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import DashboardHome from './DashboardHome'
import DashboardDoctor from './DashboardDoctor'
import DashboardPatient from './DashboardPatient'
import Axios from 'axios'



export default class Dashboard extends Component {

    state = {
        appointments: []
    }

    componentDidMount() {
       const userid= localStorage.getItem("userid", userid)


        // Axios.get(`http://127.0.0.1:8000/appointment/hospital/${userid}`)
        //     .then((appointments) => {
        //         this.setState({
        //             appointments: appointments.data,

        //         })
        //         console.log(appointments.data);



        //     })

    }

    constructor(props) {
        super(props)
        let loggedIn = true
        let token = localStorage.getItem('token')
        // let userid = localStorage.getItem('userid')
        if (token === null) {
            loggedIn = false
        }
        this.state = {
            isHome: true,
            isDoctor: false,
            isAppointment: false,
            isnotice: false,
            loggedIn,
            userId:this.props.userId
            // departments:''
        }
    };
    doctorProfile = (e) => {
        this.setState({
            isHome: false,
            isDoctor: true
        })
    }
    homeProfile = (e) => {
        this.setState({
            isHome: true,
        })
    }
    appointmentProfile = (e) => {
        this.setState({
            isAppointment: true,
            isHome: false,
            isDoctor: false
        })


    }
    logout = (e) => {
        localStorage.removeItem("token")
        // localStorage.removeItem("userid")

        this.setState({
            loggedIn: false
        })
    }
    render() {
        if (this.state.loggedIn === false) {
            return <Redirect to='/hospital/login/'> </Redirect>
        }




        return (
            <>
                <div className="side-bar">
                    <div className="row">
                        <div className="col-md-2 side-bar-left">
                            <Sidebar
                                as={Menu}
                                animation='overlay'
                                icon='labeled'
                                inverted
                                vertical
                                visible
                                width='thin'
                                className="col-md-2"
                            >
                                <Menu.Item as='a' onClick={this.homeProfile}>
                                    <Icon name='home' />
                                    Home
                                </Menu.Item>
                                <Menu.Item as='a' onClick={this.doctorProfile}>
                                    <Icon name='doctor' />
                                    Doctor
                                </Menu.Item>
                                <Menu.Item as='a'>
                                    <Icon name='hospital' />
                                    Patients
                                </Menu.Item>
                                <Menu.Item as='a' onClick={this.appointmentProfile}>
                                    <Icon name='suitcase' />
                                    Appointment
                                </Menu.Item>
                            </Sidebar>
                        </div>
                        <div className="col-md-10 side-bar-right">
                            <div className="hospital-info">
                                <nav className="navbar justify-content-between">
                                    <div className="navbar-brand">Civil Hospital DashBoard</div>
                                    <div className="form-inline">
                                        <p><Button onClick={this.logout}>Logout</Button></p>
                                    </div>
                                </nav>
                            </div>
                            {/* {(this.state.isHome) ?  )} */}
                            {(this.state.isHome) ? <DashboardHome /> : (this.state.isDoctor) ? <DashboardDoctor /> : <DashboardPatient data={this.state.appointments} />}




                        </div>
                    </div>
                </div>
            </>
        )
    }
}

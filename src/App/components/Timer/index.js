import React, { useState,useRef, useEffect } from 'react'
import './Timer.css'
import {TimePicker} from 'antd'
import { useSelector,useDispatch } from 'react-redux'
import {updateTimer, toggleTimeEditModal} from '../../../store/Actions'

const Timer = props => {

    const intervalId = useRef()
    const [started , setStarted] = useState(false)
    const [timer,setTimer] = useState(window.localStorage.getItem('timer'))

    const dispatch = useDispatch()
    const updateTimer = () => dispatch(updateTimer())

    const seconds = useSelector(state=>state.timer)

    var measuredTime = new Date(null);
    // measuredTime.setSeconds(4995); // specify value of SECONDS
    // var MHSTime = measuredTime.toISOString().substr(11, 8);

    useEffect(()=>{
        setTimer(seconds)
    },[seconds])

    const editModal = useSelector(state=>state.timeEditModal)
    const toggleModal = ()=> dispatch(toggleTimeEditModal())
    

    const handleStart = e => {
        if(timer != window.localStorage.getItem('timer')){
            setTimer(window.localStorage.getItem('timer'))
        }
        setStarted(true)
        intervalId.current = setInterval(()=>{
            setTimer(s=>{
                var n = parseInt(s) +1
                localStorage.setItem('timer',n)
                return n
            })
        },1000)
    }

    const handlePause = e => {
        setStarted(false)
        clearInterval(intervalId.current)
        if(props.setTimer != undefined){
            props.setTimer()
        }
    }

    const handleChange = e => {
        var H = e.hours() * 3600
        var M = e.minutes() * 60
        var S = e.seconds()
        setTimer(H+M+S)
        localStorage.setItem('timer',H+M+S)
        if(props.setTimer != undefined){
            props.setTimer()
        }
        toggleModal()
    }


    return (
        <div className="cdh-fv cdh-auto uni-height">
        {!editModal 
            ?<div className="chd-trayico cdh-trayico-small cdh-tray-active">

            <div className="cdh-tray-primary" onClick={toggleModal}>
            <div className="cdh-tray-xs-font cdh-tray-small-xs cdh-color-green">
                {new Date(timer * 1000).toISOString().substr(11, 8)}
            </div>
        </div> 
        
            

            <div className="cdh-tray-secondary cdh-tray-ico-xs">
                <div style={{cursor:'pointer'}} className="cdh-timeaction--btn w-inline-block">

                {
                    started? 
                    <div className="cdh-ico cdh-tray-pauseico cdh-trayico-small" onClick={handlePause}
                    ></div>
                    :
                    <div className="cdh-ico cdh-tray-playico cdh-trayico-small" onClick={handleStart}
                    ></div>
                }
                </div>
            </div>
        </div>:<TimePicker value={''}
         onChange={handleChange} />
        }
    </div>


    )
}

export default Timer
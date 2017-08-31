var BDOForms = {
    params: {},
    initForm: function(params) {    
        this.params = params;
        var $this = this;   
        $(function () {
            if (params.formMode == "ADD" || params.formMode == "MOD") { 
                $this.onEdit(params);
            } else {
                $this.onView(params);
            }
        });
    },
    onView: function(params) { //Visualização do formulário sem a possibilidade de edição (consulta)

    },
    onEdit: function(params) {  //Edição do formulári

        var WKNumState = params.WKNumState;
     
        
        if(WKNumState == 0 || WKNumState == 4){
          var index = 0;
	      $("#inicia").click(function(){
	    	
	          var iniciaFluxo = DatasetFactory.getDataset('IniciaFluxo', null, null,null);
	   
	          for(var i = 0;i<iniciaFluxo.values.length;i++){
	          	 wdkAddChild('tablaProvision');
	              index = index +1;
	              $("#nomeUsuario___"+index).val(iniciaFluxo.values[i]['Nome_Usuario']);
	              $("#nomeGestor___"+index).val(iniciaFluxo.values[i]['NOME_GESTOR']);
	              $("#count___"+index).val(iniciaFluxo.values[i]['ID_PROCESSO']);
                  $("#status___"+index).val("Aberto");
                  

              
	          }
	          
	          
	          $("#inicia").attr("disabled","disabled");
	      });
        	
        }

        if(WKNumState == 5){
            var index = 0;
            
            $("#tablaProvision tbody tr").each(function($tr){
                index = index+1;

                var idProcesso = $("#count___"+index).val();

                var c4 = DatasetFactory.createConstraint('workflowProcessPK.processInstanceId', idProcesso ,idProcesso ,ConstraintType.MUST);
                var verificaFluxo = DatasetFactory.getDataset('workflowProcess', null, [c4],null);

                var status = verificaFluxo.values[0]['active'];

                //alert(status);

                if(status == true){
                
                    $("#status___"+index).val("Aberto");
                    $("#status___"+index).parent().parent().parent('tr').addClass('danger'); 
                }else{
                    $("#status___"+index).val("Encerrado");
                    $("#status___"+index).parent().parent().parent('tr').removeClass('danger'); 
                    $("#status___"+index).parent().parent().parent('tr').addClass('success'); 
                }

                
            });
            
        }
      

 

    }							
};

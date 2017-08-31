/**
 * Ejemplo de uso 
*/

function createDataset(fields, constraints, sortFields) { 
	
	log.info("### DATASET ARY-sql2Dataset-grupo-user");
	
	var cod = findConstraint("cod_usuario",constraints,"");
	//var cod = 'dfaria';
	
	
	var arq = arqMarvinLoad("v1", {
		sql: "com.arquimeda.marvin.server.js.Sql-v1"
	});
	
	//log.info("### ANTERIOR AO RETURN");
	return arq.sql.sql2Dataset({
		jndiName: "java:/jdbc/FluigDS",
		sql: "select DISTINCT " +
				"cod_usuario	AS cod_usuario , " +
				"programa 		AS appMain, " +
				"prog_confl 	AS appConflito, " +
				"cod_grupo		AS cod_grupo, " +
				"ds_conflito	AS descConflito, " +
				"apprisco		AS apprisco," +
				"gr_confl		AS grupo_conflito " +
				" from V_ARY_PROGRAMAS_USUARIO "+
				"WHERE cod_usuario = '"+cod+"' AND GR_CONFL IS NOT NULL ",           
		log: 1
	});
	
}


function findConstraint(fieldName, constraints, defaultValue) {
	 if (constraints != null) {
	  
	  for (var i=0; i<constraints.length; i++){
	   log.info("***CONSTRAN : " + constraints[i].fieldName );
	   log.info("***CONSTRAN2 : " + constraints[i].initialValue);
	   if (constraints[i].fieldName == fieldName){
	    return constraints[i].initialValue;
	   }
	  }
	 }
	 return defaultValue;
	}

/*! arqMarvinLoad - v1.1 - All rights reserverd */
function arqMarvinLoad(a,b){var c={};if(null==b)return c;var d=(new javax.naming.InitialContext).lookup("java:global/arq-marvin-"+a+"/MarvinLibLoaderEJB");for(var e in b)try{var f=new Function("lib","return "+d.getLib(b[e],"1"));c[e]=f(c)}catch(a){log.error("*** Error compilando libreria "+e+":"+a)}return c}
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pharmacyCompany.controller;

import java.util.ArrayList;
import java.util.List;
import org.json.simple.JSONObject;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import pharmacyCompany.model.Purchase;
import pharmacyCompany.model.persist.PurchaseADO;

/**
 *
 * @author Alumne
 */
public class PurchaseController implements ControllerInterface {

    private HttpServletRequest request;
    private HttpServletResponse response;

    public PurchaseController() {

    }

    public PurchaseController(HttpServletRequest request, HttpServletResponse response) {
        this.request = request;
        this.response = response;

    }

    @Override
    public ArrayList<Object> doAction() {
        int action = Integer.parseInt(request.getParameter("action"));
        ArrayList<Object> outPutData = new ArrayList<>();
        String[] arrays = new String[5];
        String specialInstructions="";
        String specialRequests="";
        if (request.getParameter("JSONData") != null) {
           
            try {
                // 1. get received JSON data from request                                
                String JSONData = request.getParameter("JSONData");
                JSONParser jsonParser = new JSONParser();
                JSONObject jsonObject = (JSONObject) jsonParser.parse(JSONData);
                System.out.println(jsonObject);
                                System.out.println(JSONData);
                //Purchase purchase;

                // 2. Accés to database in order to get data  
                switch (action) {
                    case 10000:
                        //int id, int idUser, int idProduct, String deliveryDate, String specialRequests, String specialIntructions
                        if(jsonObject.get("specialInstructions")==null)
                            specialInstructions="without";
                        else
                            specialInstructions=(String) jsonObject.get("specialInstructions");
                        
                        if(jsonObject.get("specialRequestsFinal")==null)
                            specialRequests="without";
                        else
                            specialRequests= (String) jsonObject.get("specialRequestsFinal");
                            if(specialRequests.equals(""))
                                specialRequests = "without";
                        
                        DateFormat df = new SimpleDateFormat("yyyy/MM/dd");
                        Date deliveryDate = new Date(Long.valueOf(jsonObject.get("deliveryDate").toString())); 
                        Purchase purchase = new Purchase(
                                 0, 
                                Integer.valueOf(jsonObject.get("idUser").toString()), 
                                //Integer.valueOf(jsonObject.get("idUser").toString())
                                Integer.valueOf(jsonObject.get("idProduct").toString()), 
                                df.format(deliveryDate),
                                specialRequests, 
                                specialInstructions
                                );
                        outPutData = purchaseInsert(purchase);
                        request.getSession().setAttribute("purchaseInsert", purchase);
                        break;

                    case 10100:

                        break;

                    case 10200:

                        break;

                    case 10300:

                        break;

                    default:
                        //Sending to client the error                        
                        outPutData.add(false);
                        List<String> errors = new ArrayList<>();
                        errors.add("There has been an error in the server, try later");
                        outPutData.add(errors);
                        //view.setFormattedDataTosend(outPutData);
                        System.out.println("Action is not correct in PurchaseController, action: " + action);
                        break;
                }
            } catch (ParseException ex) {
                System.out.println("Message: " + ex.getMessage());
            }
        }

        return outPutData;
    }

    private synchronized ArrayList<Object> purchaseInsert(Purchase purchase) {
        System.out.println("-------------------------purchaseInsert");
        PurchaseADO helper;
        ArrayList<Object> outPutData = new ArrayList<>();

        try {
            helper = new PurchaseADO();

            int rowsAffected = helper.insert(purchase);
            System.out.println("purchaseADO");
            if (rowsAffected == 0) {
                outPutData.add(false);
                List<String> errors = new ArrayList<>();
                errors.add("Purchase not correctly inserted");
                outPutData.add(errors);
            } else {
                outPutData.add(true);
                outPutData.add(purchase);
            }

        } catch (IOException | ClassNotFoundException ex) {
            outPutData.add(false);
            List<String> errors = new ArrayList<>();
            errors.add("There has been an error in the server, try later");
            outPutData.add(errors);
            System.out.println("Internal error while creating new purchase (purchaseInsert): " + ex);
            Logger.getLogger(PurchaseController.class.getName()).log(Level.SEVERE, null, ex);
        }

        return outPutData;
    }
}

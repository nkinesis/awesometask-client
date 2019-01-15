package com.taskmgmt.controller;

import com.taskmgmt.model.User;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.AfterClass;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.BeforeClass;
import org.junit.Ignore;

/**
 *
 * @author gabriel
 */
public class UtilsTest {

    public static User testUser;
    public static Date testDate;
    public static JSONObject testJson;

    @BeforeClass
    public static void setUpClass() throws Exception {
        System.out.println("=> Begin tests");
        testUser = new User();
        testUser.setPasswd("12345");

        String inputDate = "01/01/2018";
        testDate = new SimpleDateFormat("dd/MM/yyyy").parse(inputDate);

        testJson = new JSONObject();
        testJson.put("name", "John Doe");
        testJson.put("country", "Brazil");
    }

    @AfterClass
    public static void tearDownClass() throws Exception {
        System.out.println("=> End tests");
    }

    @Test
    public void testStrToDate() throws ParseException {
        System.out.println("* testStrToDate");
        assertEquals(testDate, Utils.strToDate("2018-01-01"));
        assertEquals(null, Utils.strToDate(null));
    }

    @Test(expected = java.text.ParseException.class)
    public void testStrToDate2() throws ParseException {
        //para testar deve jogar exceção para cima
        System.out.println("* testStrToDate2");
        assertEquals(null, Utils.strToDate("potato"));
    }

    @Ignore
    @Test
    public void testAssembleQuery() {
    }

    @Test
    public void testGetMockPwd() {
        System.out.println("* testGetMockPwd");
        assertEquals("*", Utils.getMockPwd(null));
        assertEquals("*****", Utils.getMockPwd(testUser));
    }

    @Test
    public void testFromJSON() {
        System.out.println("* testFromJSON");
        assertEquals("John Doe", Utils.fromJSON(testJson, "name"));
        assertEquals("Brazil", Utils.fromJSON(testJson, "country"));
    }

    @Test(expected = JSONException.class)
    public void testFromJSON2() {
        System.out.println("* testFromJSON2");
        assertEquals(null, Utils.fromJSON(testJson, "potato"));
    }

    @Test
    public void testIsNull() {
        System.out.println("* testIsNull");
        assertEquals(true, Utils.isNull(null));
        assertEquals(true, Utils.isNull(""));
        assertEquals(true, Utils.isNull(" "));
        assertEquals(false, Utils.isNull("Text"));
    }

    @Test
    public void testIsPropNull() {
        System.out.println("* testIsPropNull");
        assertEquals(false, Utils.isPropNull(testJson, "name"));
        assertEquals(false, Utils.isPropNull(testJson, "potato"));
        assertEquals(false, Utils.isPropNull(testJson, null));
        assertEquals(false, Utils.isPropNull(testJson, " "));
        assertEquals(false, Utils.isPropNull(testJson, ""));
    }

}

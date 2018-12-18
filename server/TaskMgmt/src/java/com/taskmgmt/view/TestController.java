package com.taskmgmt.view;

import com.taskmgmt.model.Parameters;
import java.util.Date;

public class TestController {
    public String ping(Parameters p) {
        return "Server is online! Current date and time: " + new Date();
    }
}

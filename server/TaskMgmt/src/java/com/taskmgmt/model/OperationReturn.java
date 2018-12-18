package com.taskmgmt.model;

import java.util.ArrayList;

/**
 *
 * @author gabriel
 */
public class OperationReturn {

    private boolean result;
    private String message;
    private ArrayList resultSet;

    public OperationReturn(boolean outcome) {
        this.result = outcome;
        this.message = String.valueOf(outcome);
        this.resultSet = null;
    }

    public OperationReturn(boolean outcome, ArrayList resultSet) {
        this.result = outcome;
        this.message = String.valueOf(outcome);
        this.resultSet = resultSet;
    }

    public OperationReturn(boolean outcome, Exception exception) {
        this.result = outcome;
        this.message = String.valueOf(exception.getMessage());
        this.resultSet = null;
    }

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean outcome) {
        this.result = outcome;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public ArrayList getResultSet() {
        return resultSet;
    }

    public void setResultSet(ArrayList resultSet) {
        this.resultSet = resultSet;
    }

    public boolean resultSetExists() {
        return (resultSet != null);
    }

}

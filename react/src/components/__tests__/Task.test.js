import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from 'react-testing-library'
import { TaskForm } from '../TaskForm.js'

afterEach(cleanup);

test('Form', () => {
    const { getByLabelText, getByText } = render(<TaskForm></TaskForm>);
    
    //all fields and buttons must exist
    const fieldDesc = getByLabelText('Description');
    const fieldPrio = getByLabelText('Priority');
    const fieldDate = getByLabelText('Due Date');
    const btnSubmit = getByText('Submit');
    const btnClear = getByText('Clear');

    //all fields must be empty (no hardcoded values)
    expect(fieldDesc.value).toBeFalsy();
    expect(fieldPrio.value).toBeFalsy();
    expect(fieldDate.value).toBeFalsy();

    //check field validation
    expect(fieldDesc.getAttribute("maxlength")).toBe("140");
    expect(fieldPrio.getAttribute("max")).toBe("9");
    expect(fieldPrio.getAttribute("min")).toBe("1");
    expect(fieldDate.getAttribute("max")).toBe("2099-12-31");
    expect(fieldDate.getAttribute("min")).toBe("2001-01-01");
})
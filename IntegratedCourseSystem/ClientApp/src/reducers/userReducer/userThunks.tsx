import userService from '../../services/userService'
import teacherService from '../../services/teacherService'
import studentService from '../../services/studentService'

import {RootState} from '../../store/configureStore'
import {Action} from 'redux'
import { ThunkAction } from 'redux-thunk'
import {StudentInfo, TeacherInfo} from '../../store/types'

import { loginUserAction, updateUserWithQueInfo } from './userActionCreators'


export const registerUser = (email: string, password: string) : ThunkAction<void, RootState, unknown, Action<string>> =>
  async () => {
    try {
      const createdUser = await userService.registerUser({email, password, role: -1})
      console.log(createdUser)
    }
    catch (error) {
      console.log (error)
    }
  }

export const loginUser = (email: string, password: string) : ThunkAction<void, RootState, unknown, Action<string>> =>
  async dispatch => {
    try
    {
      let loginResponse = await userService.login ({email, password})

      const roleMap = new Map();
      roleMap.set(-1, "user");
      roleMap.set(0, "admin")
      roleMap.set(1, "teacher")
      roleMap.set(2, "student")
      const stringRole = roleMap.get(loginResponse.role)
      loginResponse = {...loginResponse, role: stringRole}
      if (loginResponse) {
        dispatch(loginUserAction(loginResponse))
      }
    }
    catch (error) {
      console.log (error)
    }
  }

export const createTeacher = (teacherInfo: TeacherInfo) : ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      const createdTeacher = await teacherService.createTeacher(teacherInfo)
      console.log(createdTeacher)
      dispatch (updateUserWithQueInfo({
        name: teacherInfo.name,
        surname: teacherInfo.surname,
        role: "teacher"
      }))
    }
    catch (error) {
      console.log (error)
    }
  }

export const createStudent = (studentInfo: StudentInfo) : ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      const createdStudent = await studentService.createStudent(studentInfo)
      console.log(createdStudent)
      dispatch (updateUserWithQueInfo({
        name: studentInfo.name,
        surname: studentInfo.surname,
        role: "student"
      }))
    }
    catch (error) {
      console.log (error)
    }
  }

export const updateUserRole = (
  role: number,
  id: number)
  : ThunkAction<void, RootState, unknown, Action<string>> =>
  async () => {
    try {
      await userService.changeUser({value: role, op: "replace", path: "/role"}, id)
      //dispatch (updateUserWithQueInfo({}))
    }
    catch (error) {
      console.log (error.response.data)
    }
  }
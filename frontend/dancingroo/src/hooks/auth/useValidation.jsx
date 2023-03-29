import { useState } from 'react';

function useValidation() {
  const [errors, setErrors] = useState({});

  function validate(body) {
    const { nickname, weight, height, familyname, birthDate} = body || {};

    let isValid = {
      nicknameCheck:true,
      weightCheck:true,
      heightCheck:true,
      familynameCheck:true,
      birthDateCheck:true,
    };
    let newErrors = {};

    if (!(birthDate && birthDate.trim())) {
      newErrors.birthDate = "생년월일을 입력해주세요!";
      isValid.birthDateCheck = false;
    }
    if (!(nickname && nickname.trim())) {
      newErrors.nickname = "닉네임을 입력해주세요!";
      isValid.nicknameCheck = false;
    }
    
    if (!(weight && String(weight).trim())) {
      newErrors.weight = "몸무게를 입력해주세요!";
      isValid.weightCheck = false;
    }
    
    if (!(height && String(height).trim())) {
      newErrors.height = "키를 입력해주세요!";
      isValid.heightCheck = false;
    }
    
    if (!(familyname && familyname.trim())) {
      newErrors.familyname = "가족 별명을 입력해주세요!";
      isValid.familynameCheck = false;
    }

    if (nickname && nickname.trim()) {
      if (!/^[a-zA-Z가-힣]+$/.test(nickname.trim())) {
        newErrors.nickname = "특수문자는 사용할 수 없습니다!";
        isValid.nicknameCheck = false;
      }
    }

    if (familyname && familyname.trim()) {
      if (!/^[a-zA-Z0-9가-힣]+$/.test(familyname.trim())) {
        newErrors.familyname = "특수문자는 사용할 수 없습니다!";
        isValid.familynameCheck = false;
      }
    }

    if (weight && String(weight).trim()) {
      if (/\s/.test(weight)) {
        newErrors.weight = "몸무게는 공백을 포함할 수 없습니다!";
        isValid.weightCheck = false;
      }
    }

    if (height && String(height).trim()) {
      if (/\s/.test(height)) {
        newErrors.height = "키는 공백을 포함할 수 없습니다!";
        isValid.heightCheck = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  }

  return { errors, validate };
}

export default useValidation;

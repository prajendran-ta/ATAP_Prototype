import styled from '@emotion/styled'

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 100%;

  & input {
    width: 100%;
  }

  .amadeus-input-group-addon {
    background-color: transparent !important;
    padding-right: 5px;
    border: none;
  }

  .amadeus-input-outlined {
    border-radius: 5px !important;
    padding: 5px 10px;
  }
`
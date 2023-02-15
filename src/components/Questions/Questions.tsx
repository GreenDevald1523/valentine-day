import { Box, Title, Radio, Button, Image, Flex } from "@mantine/core"
import { motion } from "framer-motion"
import { useState } from "react"
import { useTypedDispatch, useTypedSelector } from "../redux/hooks"
import {
  increaseScore,
  nextPage,
  selectPage,
  selectScore,
  selectShowFinalPage,
  selectShowQuestionsPage,
  setShowFinalPage,
  setShowQuestionsPage,
  setShowTitlePage,
} from "../redux/slices/testSlice"

export const Questions = () => {
  const data = [
    {
      id: 1,
      name: "Начнем с простого! Когда у меня день рождения? 🗓️",
      variants: ["16.06", "18.07", "16.07", "15.07"],
      answer: "16.07",
      url: "data:image/jpeg;base64,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",
    },
    {
      id: 2,
      name: "Как называется моя рабочая должность? 💻",
      variants: [
        "Backend developer",
        "Fullstack developer",
        "DataBase developer",
        "Frontend developer",
      ],
      answer: "Frontend developer",
      url: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYVFBgWFRYYGBgYGBoYGhwYGBgYGBwYHBgZGRgaGBgcIS4lHB4rHxgYJjgmKy8xNTU2GiQ7QDs0Py40NTEBDAwMEA8QHxISHzQrJCs0NDQ0NDQ0NDQ0NDQ0NDQxNDQ0NDE0NDQ0NDQ0NDQ0NDE0NDQxNDE0NDQ0NDQ0NDQ0NP/AABEIAKgBLAMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQIDBgABB//EAEEQAAIAAwUFBQUHAgYBBQAAAAECAAMRBBIhMUEFIlFhcTKBkaGxBhNCwdFSYnKCkuHwssIUFiNDovEVBzNj0uL/xAAaAQACAwEBAAAAAAAAAAAAAAABAgADBAUG/8QAKhEAAgICAgIBAgUFAAAAAAAAAAECEQMhEjEEQRMiUTJCcYGhBSNSYZH/2gAMAwEAAhEDEQA/AGKTRF6ThCZZ0WCdAUjM4j1Zwi5J4jPrPMXJaYbkCjSyp4gyTPEZdLVBUq1QeQDWyZggpGjM2e1Qzs9piORE6GwMUbRtyyZbOcaYAcWOQ/mgMepMFIx3tVtG9MuA7svPm/xHuy/VFcZ3ZqxRcpJCqdOLuSxqWN5jxrkO/wBBSHNgoiF2/lP55QksqHvJr9B6Q+lpfYL8KU7yP3/mMRnUiq6C7LLIBZu02J5DRe71JgfaL7yrwFfHAejeMMFXAnhCi3vR3P2QPJQfnCrskug/Zy7pPEwcVp3xRYkAlqa4k5QbOYbtBoKxH2Ly6RTNF2797/8AX0EdazcdAcLy08GP/wBostk8boAA7J54k/Qx22pXvFUjtXSy9cMO/Ed8HRU5O0VOlRTLUHUHQx7JJYHDFe0OB+mIPQwPZJ94Y5jOJu5Rg4y7L9Dke4nwJ4QC31aCxKIIqDQxbJQqwFM8OREUGYaU4RJpxIHEekERqT0W2uz3DUZHLkeEUFcucFJaQ4uvrrwOhiiYSu6abp4fzAxHXYsXJfS+yVCvMH+dxEM7PMqOfqOMAy7TeBBAyww1iqy2i7unjunrmpPPTn3QyZXki5K2tobkRExyuCKiPaw5kdECYiaRNoGmtEuimXZXNQQJMlwRNJECPNgRmpK0BxrspcRWTFjTIpZhDWLR16PL0UuYrZ6RCUEFoqmNjFPv4g8/GIEwS2qLVtQhMJ0SE4RRZfQ7W0iLFtHOEizxxi1Z/ODYKHyT+cGSp0Z1J8FS58SxXE0smdDGRaYy0q0GDZVq5xLBRpZu0biM+d0VHM6DxpGOmOWOOJZsTx1NetPOCbfaiVC1zNT0H7kQLLEGJ0PEhUXL7h9lahrwy66ecaTZqKsvGt44jv1jN2RLzAcTGlBoIkmbUrDWmboApxPHlGet7Vd6faUeSAwfbrQyLRReZsAAaGpwwhbaZVw0oQTcY1pixahOBP2RAXZW6Wh3JaiA8hBLNWA2b/SH4R8oIlNVQeQ9IDHKLTO/1EFCcssTgHPzENlWrqGzCZDIA1z5/wA6qZSXpzH7Kqvecf51h0Aqs2QChV8q95qTE9GfJqv3FFvsxRr69T0+19YlKmB1I4ihHWGs5lYZNXQ3H+kI58i6xZMDqmR50B9PCAn6YYSLrHMqt05runpofD0MEAwsk2jfDZBt08K6Hx9TDFswe7xgtFqOmLUYZ5jqMRE2nXkD6gY8buoPNT848ioNdbk2f4jx5EefWIgSjZcraiIueONdMMeWMDWV6FkPwnDpmPIiLGDNVQvRqjMagcjTPhEZG0lbDLFbLtakstfzKdQRmRrxx10YrNBFQQRxEJHl1FaXWpgeegJyIipHPaVsT+U/mpgT3QykzB5GOF2nVj55kDvNhd72Z9pAOYLH5RwncSSeJ+gwEFuzJVMJtE+sAzH5x7MesBzYEUoqkF2yTvFRmxQ7kRS07iINkoLZ4qd4G96OMeF+cTkHiWs8Uu+MRZ4pdsYnInE+cgmJivCHNm2Wp1h5Y/Za+rMvwipw5jD1PdGWWaMey/iYsHlFiPGpf2ZGjRD/ACu2hEBZ4fcFGfRxxghH5w5/ytM5RFvZuYNIZZoP2CgKW/OCZc08Yi2xpi/CY8Gz5g+FvCG5Jg4lkyYSTjoFHInP5HuguUIXyVNQDoWJ6jdHz8IYS4vj0dTDHjBIb7JSr14Cvy+cN5zbyDi1T0UE+tIA2MuDHoIsthJmKq53aD8xIPkISW5FvUQ/Z8gTnLsKqMAD5n5d5inb9nCMCCcSBQktmwIz/C0HS7WlnlFmYKo3bzY1IzCqMXaug8Yxm0faX3rEMj0LqQ18ghARdW4opxJzO8YEe7Mrl9RpJk0hFB1y7sweev8A1B9mO4vSE7Gqqv2a5muJNc4a2Z6SweAPqYaS0XLsJsAFSxyvFj0XD0URTtyf7iQZxW89akhmVheOQZcgOGUE7PlnBdABePoO8ivdzg622YTEKE0DYGgFe6uRrTGFsz5Xcj5baNt2p6VeYAa0oWUUrTMUrwi2y2q1nEM7ZZ1ccsDURpdsbHDTgqFUSXIWl40Wil8K8c489m9vSrwUq6ByqLgLhZQq1qTWtT5iHnxjCzKpy5V6FVn2mHa7N3GOBbEqfxDNTzEaiW95AagmmYyqNRyqIW7c2dJnTjdYhmYoTdNFfIGuTC9QHrCWx2idZGaU9KAg0apWhwvKRjTCuHhWK4tyimasWXdM2StUVimYK114jiv1zpA9htQYduWcT2WvdM6ekXzXusp0Ip/PGGo03aAp8wq6MMS26D9ojsg8GxYHp4OXkNdAVypApkCCSMzz1+sDpKBcfqI0NOyeRqRjyg9oPoy5nuhZJtrkZJMp9g3WyrUo/HlhExOl1AO4zCoDC4cyPkYttOz5b9tFOINaUaoNe0MYFGznUi5NYpUVSZR1u1xoTvA0rTHhWtIBS9hL2cnI/wA6wNMksND3YwLMlzEWjS2F0Gj2dhSlSewxBHabKuvKDbLtGWygX8RQEPutXAYg8yMq5wRHjiwR3gW0TIfTJSt2gD/OMB2jZaNkSp8R5/WII8b9GfaaYgZsHWjY8wdm63Q0PgfrC2ZIdWo6MvUGnccjCydKycWFSZN+tNFLeArAsxaRptgWPdZjkVKfqz8vWEW1bOUJB0jLHyFKTiO4asBMwiIGdygN59DFZtEarEoDs1qUGNJszb1xWUHBhTPI1GPWlR3xgRNMWLaSNYzzxKRYmb9NppBSbUThHzlbaeMWrtHnFD8YNn0Q7VXlA03aY4xhxtOJrtGsGOCgGofaJ4xBtolVJrkCYzotcei0XtcBieg/f0jRCPoMI8pJBUntEnkPmT/yg2VC+yMSKnUn1oPICGEqNaOmutGk2UtEHMn6fKB7da1lM8xsloq0zLXFNAdDj3AsdIJsJpLWgJ5CnE8SIzM0vbLUtnNFRXet01oASXYnItQUGmUVdsTNLjEpsrva5q32KpeC4AlUUnJVHprGu2p7MyZclWFAVADVrVjXNcaq3T6wuttleUs57PfFyYqBERjRFUgPeHAeNYTSfaZi6yGczV98pVmBFUbdYMpyOKmmIBBxMTJCVrj+5zebbdmjRQAKEkaEmp8Ya2dSwRVFSd48AAcCToK08DClaCo0UsOGAJp0wjU7IlEJeIpfIIrmECgKPIn8xh5dG5zqNr2F2eSEWgx1J4njFseCOisoBZkpfeqzAFXW4aioqKlfGrQs2l7GynN+SxlPW9QYoSDUbtcMRpDqetVIpWoyrTHTHTHWM+9ot43bqkHDtqcDhndixNNUylwd2l2eWHZk2Rf98yu016qBUhSWqzDnke6Kva+TfuKqlnBbAAmila7xGXZBpnn3sdlCeGLz7mK4UJLKa4jhlw4xZbwAVYasPE7vziNpUkPhxPlbFuy5RS8DXALg12oN2h3gMRhnFm0MgeZi1TvkfdB84p2iCVUDMtQdTgPMwq7Nz0g/Zu8t8/Fh3Lh/Ve8oJaPJUsIoUZAADuFIqnzwgxqToBiT0gswt27LI8dwBU6QunWqceyiiuGJvEczlHTLPiCzFjTM+dBkO6FsAR/jBqCBxw8+ESdEcUYKwzoQD4QrdlxBJplnBOy0IwqCuJWpqQMAKcs4iZCbbNAJKO8slbtFIu9i4pusCKqKEcxjWOs6zlqHKPQYMoKMTX4lJIy4Hug4iPKQxAZ54HaBGFcRlQEnEcgfCOs81JgBVgVOoxHePrFzisLp+yZTEkLcb7SG43LLDxECtVZB9LQKAFFBC7bWz1mLWt1tNQev1i/ZalVus5e7kzUvXeZGeNcaDPlC/anvHwRwgN4E0q4FN0pXAGvEHMxysPjS+d8n1/I9ppGE2rsqfLqxQlRjeTeFOJpiO8QlNoj6Rb7U6WYuy3Zlyl0G/RyKDGgrnXuj5wZbcD4R09LRVJbEV8x2MN12XxMenZyjjAsW0KApiapDNbIvAw1s2z0FNwRG6CtmdRIuRBHbVF2a4GArAaY6wVGy5YrGSAQxs2zZjjdQkHHLPgOggPYFmDTkvYi8BT68Y+v7PsoCsxGQPkIpyzcGortgacNL2fLrMKXR93zwhhLheh3wPuH1WD5RjWujoLo0tmFZa4E4ZA0J5V0hJ7LymlW12dLqv7xVKjcU38KHQVQqCaVh5YG3E/nGL7A/aX770/WajzB/NFTfFiZo8ooe2Kest2DYK5DA6XqUIPhXxhbtfY1jlMbSEUTKg8VJvAkhftY1wi82nC6aMODAH1hJtDY7THCs9QxvXFBVFQA0LmtWxIpjoe6yM00YXgknroK2BZxOYvmiuTxBa8Sq86YE/vGolrQU0GA6afTugXZ0hJaKiC6q+uZJ51MET5wRSzVoKkkAtQAEkkDGmEJJ2yx2WR4zgUqQKmgrqc6DjCD/AM8WFUxGQZhdHVUrXvJ7oBmT2ZrzMSeOo1w4d0KWRwylvo1rtA5MQ2faverj2lwb5HofrF5lxAL6dMrED20bv5lPg4/eC/dmKbbL3D1X+pYI3JWLP978h/qEXJLvTE4ICx6ndX+490UJjNbkoHjj8ossG0Jd9wWobxGINKLhnlnePfDJbDmlxj+oymE5AfSKhIF4scz/ADCLb4bFSCOINRESYLMaK3TA3Tj5RRaJQAFSSSacsjpBcBbRbsgc/l+8AIvcJUilQoyArvaZdIaWJaIBwr619NIo2fZygY5lqYCmtKwcksKKDKpz5mvzgIhwimfOYdhC56gKOrH5VMEUiNIYAAJ7ECtKnOmXOh1ilTjmRXCoiVtm79OCjzJi6UgNOWPfpChCJb3ceRHiMPOkVRYwioiCkrsBfY5QZjUVAGvE/sD4xfMscuvYT9Ij2xLROpJ+Q8gItc4xmc7kxqPmb2UARD/x96G7Weq1rlHSJeUaEnRkb2LpOygMTFrywCBDq0IAkJ82ESaHxvZkNuyv9ZusBSZYBqYO9opoWc/X5Qp/xFcoaPR0IVQ42XaAJ6fjX1j6ltO2FJD3K3jUYdI+L2K0XZqEmgDAnxj65Ytu2b4pyU8Yy+QnyTSKsm2YyTLqhfg0tf1LMP8AYIulGJWK2yls85XcBn900v7xVmDU/K/nEJZjVB9muDuzSbNfcX8RHkYuVyGcqCbj1bgBdDE891jgOAgDZszcPJlPccDDOzNSc6HJ0VvCqny9IHG2HK2o2i0NWHMoYA8QITSJZy1U3T3ZHvFD3w6sIqtNRCdMWclxTRfKWLJqXlZftKV8RSJAR7EMzdsxNnS6qrwAEWQVtKVcmsNCbw6Nj61HdAkQ6EHcUw7ZM+5MXg26e/s/8qeJjTRi6kYjMZddI2MtrwB4gHxFYhmzxqVk4F2id2nFl8je+UEwq27Ouqo1N4+Au+jmCimPaFiz7qzZnOg6gbvm0BWaylZRc8h3kV9LvjE7StVlysrxLvxC4nyFf0wP7cWppUqVZ0wdwWamdWIAVeHDoItihM8rlX2F8/aSS2xmojfjCn1rDCye0EylbyuvHA+DL+8ZSV7MSgo94WdtaEqoPKmJ6mFu0NlvZf8AWszsFFL6NiKcT9peuIzrEZSfU7N7QS2wcMh/UPEY+UWtakd6owYAUwNepIj5vsDabz/eO6qEVgFpWupIJ1oLumsMJda1Fa54ZwGg2fSJSikTjGWTbc1R2rw4OK+efnDeze0iHtoV5rvDwND6wKDY8jjFEi3S3UsrggZ6UrlUHKLZjXQW4AnwFYhBBNJedTUuQei4fSHMoC7UClcfp5UhRYULTFY/eJ/NifKsOjAQSJEVsPE4DqcBFrR5JFXHKp8MB5keELOXGLZEg5FoKDTCPJhxiVYrmZxz4yQ5hy2EXSm5wo/xDERYkw8Y6MZpIx/G2xvNfCBJS4Vii/XCsXpgKQs5KRbjg4vZhvaOXW0OTlX5QpmzRksOvaOWWnsOnpAEvZrOaLmFZu5FLnyUw6klHZsTpCma1Opi2zMaZxG0SKNQxZLWGTsqbHlmsbWgSkXA3ipPBcST4LDuXhgcSCQaZVBofMQu2NKaWqO/Zdiwz7KkK4PUesP9qybrhhkw0yqMD5XfOGNMHtf7RbYH7S/aU+IxHpDCfM/9uYCRoaZ4ZgV5X/GEsh6EEaQylPeRl4b692Y/TWFa3Zc1ao01jsgdrwdqEA1F3Hgez5wwl2Qqaq5/MAR5UhL7N20V92x03PW79P2jSCC4pmCblF0VkuNFboSp8CD6x6Jo+IFeow/UKjzi0R0BxQvJi3a1kvqGXFlypquoHPUfvGdBjYGStajdPFcPEZHvhbbtmhjeoc8SgGPNkOvNTXlCOLNGHOo6fQirGwlC6ig6BV78B6wpstlkqwIb3jA4BcRUcaYCh4mGZer3R8O83AE1uj1PcOMAObIptUXRm9rN7yfcGQon9z+pHUQ8ttqWWhY4kDAcToPGM1LDBHcVZ2qFoCTUneag51P5YKEgvzP0EbGlidaWc5A3R0XOngP1xl/aK3iZtMg5LVV7peHqTGs2OwlSHfW7cA+82LeAuD8sYD2r2c7uJsntrQkVAJpkQThUcDn629Iyt8nY3cxTOlh1KsKqwII4gihEZtfaooLs6S6uOG6CeN1qEecUpabTapiFAZMtGDXsadSSBfNK4UpjjAIOxKlWdAikIGc0DNiScSAWOJwETsdqvzHQDdRUJavxvU3afhunvi20SEeodVdRhRgGHE4HuhRsnY7CWHV5kh3ZmKKRdCljcVkYEYLTnEIP6R0L9o2ubKvOER5arebfuuKVLGhFCO+sCez9qUIstw6zGLOb6MoZmJdirUoRQ8dIhDcezgOLXTRTUMBm2DMudewrjAU3iIr2lbjLE2WrlboZQOVGKYMCMVuZUO8Yd7Ik3LPLYZXEc8t8u3k7eEB+1eyGmb6CrUusv2qYrTnSo8BrFd7LOOijZu0CqpeSrMqgkEBceFRQneQUBOuVIZy9oy2+Kn4gVByOBOBwKnPURiLMzJShKkcMDWtT5+kEJbGGBAOmQBpSgpphRdPhENQlm3rXpyitHo5PQeGPz8ox5txUVl3katTdwBxYnAYHNdNI10uWwUXjVqbx4t8Rp1rHI/q+d48SUe2/4RdiSbGCPWIzGxgaU9ItdoyYM/yRuL37HcaPlLbWlp9o9xij/MiZXH8Ii20HY9hD+WO/8i4wuJ+mPQ/EZ7Jf5lUfAYi3tW2iDzj1Lcx/2k8IJS10zkp4QfjX2JzE862mc94ihMbL2K2WHZ6j/acfqW5/cYDsNpVmA9ygqeEfRNkWJZYJAAvUGHLH5+UY/KycFRYpWfMrdsiUGNVNYHl7Nl5hD5x9YWwpfNUU41xAgxpShSAoFQRgBqIswfVG7G+SvR81tNlrZ1CjFFUjoF3h4V76RKxsJ0m5XfSl3u7J6UwMHS8h0EKLTJaS4dMFJw4AnNSOB0/YRrHjtV/wqTA0OBGGPHWC5D0II0ixyk7eWizKYqSBe6HU/wAMDrUGhBBGYOBEQvjK++wtGocMNRTMdDy+kaCwbRv0VzvaHRvoeXhyzixepiCyipGtDRNZrDUxnbPtF1wreH3s/wBX1rBibXGqN3EH1Igmd45IepajrjBKTA2UZptrj4UY/iKgeVYHe2THN1cOSZ976DnhAB8bHu0bYFN2XjNYgADL8/d39BFUuc0tSl0mYd5ycixzYNkVwoOQpTCIbKkJKBZyA1O0eyBqBX11gbadsM/clrgtSWO7hrU/CnHU0y0KyjZI916ALXNabMVA1c8RkB8b86DAE6twMPLGgvYZKKDr+w/qhdsuxEUvdprt6mBFTRVHIC+35dYb2JaAg5hmBPGjEV8AIC7osyy4x4+wy1IrKFZQdTXj1hBatgI2KMyH9Q88fOHLvWIEwWzMkZK07DmrkA4+6cf0n5VhXPBTtAqRoQQfAx9Aga1Kr7jAMMyCAR5wORKMGDEw0aibsKU53QyH7pw7wflC+0+zsxewVccOy3gcPOKpJt2v2LISUVT99iC3WUTUKMSA1K0zoCDToaUPWDJMouyoubMFHAEmgJ5CI2iQ6Gjoy9QQO46wRsaZdtEonK+B+rdHmwg85J0w8ItWmbbZSXUCVJAVaXqE3WGKkgAGjBx4ReqVUoScMK68VYc8seIMdMAVlbIVKn8xqD+r+ox003XVtDuN34qT+YU/PECJds7GE1WdaCYvbA7LkCvcSKEdaGMhH0pTvsOKqfNwfRY+cTUusV4EjwNIZMrki/ZUm/OQHIG8ei4+oA742t6M97MWapdzpRR6t/bGguRwf6phzZcy4puKRbjcUuzmWIGsTJitzjHF+qD1ot7PldmvIaqOUES7CzGpGcaOVYUg2TZ1GUe/UrOdJpCSybI5QedkjhDtbiCusdKtKXt4+ELklwjYsHyYu2XsclxhlGzywGkV2cpdqlKeffFkec8jM5y2bIqkSETEViJiNPh5pJ8QSRjtq2b3c1xoxLr0Yk+RqO4QLQEUIBBzBxHfGu2ts8TkoKB1xUnzU8j8gdIyJUqSrAhgaEHMGOyiRlaMr7T21LM6KgqzC8yk7oXSmoJPpAEj2hltS8HU0pUbwA4dO6M/t+2+9tEx64FiB+Ebq+QEAoYvjBNbF+eSej6JY9rynwDgnhdYeohpLmg5EHvx8I+Wo8NrDtmYlN68OD7w7tR3RHi+xZHyf8kfQr/InpT5mPQ5+ye8j5Ewm2bt6XMoDuNwJwPRvrDkGK2muzRGSkrTCLGqs1JhujS7kfxMcvDvh6lnCrdSqdKEnmSwNTGbatMM/LoYZbIttaIxw+GuYIzU/Lp0hRMkX2GnZ6k1dnf8RHlQCndFkxgBcUBUXFqYAnSvE648osd6Anh/AIjYpBdsclN5+bZhfn0w1hZOkJBfmfSDbFIui+2BJvD7ou0FedC36jFNieqXvtszj8LuWX/iREtrsbgWuDsqHozqp8mMTbDCFj9yvI7OJjysRrHAwWVo6Y4UEnSBQ1TjnnHtufADifT/ALEDymvNSuZp3QjCMbPlXj/1FsRAj2CQ9ZQRQ4jgcoWWzY8ki9duHQobprpQZVryhnAttIBRjo2A5kEV9fGDZA2zv7yXvZkMjU4glGI7wYku+mOBIoaaMDQ06MPKBtlPVXX7Mx/+VH/v8otD3HIOCuaqdA3xKetKjmWhCxdHqTKsjZVvoR97AkdxRowO0BSdMH/yP/W1I3syQS1Qd1qFhqGFLrKeOABBzoOdc3tXYhZ5jq4G9eowPxANgRzJFOUFMEkVbFmMlAMmF7v/AJSNGZZuK3M/L6GFWzJYZsBgouiNG6blOAjN5GdRaQkY2K2EVO2MEOKRQ+ceQzr+5L9TbF6EEpdIZWaR5wrsM3E1h7YJyhgTx/hj3kpOMdHJcOUtgttspukjMaRk7TbCrRubVaVLEjKsYrbkoF2KjWK03NfUWRiovRofZXaRZ7tcCMY2Bj5p7HORO6Anyj6Bsy0X05g0+kcry8PF2jRFhgiQiNIkI0+FgpWxZSPYz3trMly7LMnPg6IRLK0vFyDdXmK4ngAThGgj5b/6r7Vv1kqcJYBYffcr6KQPzNHTQsU2z5SWxiamKAYsUxeioIRoIk0OZpAQaLkaHTIM1kcDDjZe2HlUV6uniVHI/IxnpFoI6QwSYCKiGcYyWyRnKLtG9s9oV1DIQQcj/MjHpJVgQaV8mGKnyp4RkdmW8y2+6e0PmOcaoteWqmtRUHzB9Iyzi4s6GPIpxNI82+Eu/EA4GlTQKD+Zgfyw8s8oIoUd51J1JjO7H3jL4XU8AruPVY0lYzyexHpJAW1HAMuuAv4nQUBK1P4go7xHrNBUxAwoRAq7OQEkM9DkL7UXkorSnWJGVFco2RrHVixrHwdvzBSPIA+cef4Z+KnniP8Ajj6weSF4sW7RbeTo3qsXWKTWjHSoHWuJgv8AwbHtMhpj2NeIqxi3/DH7eHJQD4kkeULYeLIiJCITZMpBecCnFze8LxPlCm03Xa8ildKolxj+eoBECxljbHFYrtMu8hAzFCOo/nnGfeYA9Xne6mvkRvKQpUUdaUrSlcRrpDCTaZykhgkxbhcMjG8RQ03QKG8RQAc8cIbsRqnQbYkKPU/GKEcCtSp82r3cIYuoIoQCOBxhbY5hmFGK3SqhmUnJmGKnAYgctYY1hR0tEoS7amGjKubMo7goYnzXxhzWFgf/AFGcUNGIxFccAfJVhZNpOiS6LdkWUqgJFNRXOGVYgky8KxKOFmlKU/qDFaAbchAqMvSF3vIc2ifdHE+XfGfmz6mv0HlF+Lx45I7igOTXsMRU0QeAj26n2RHR0d1iqKOIT7Iit7LKfAoDHR0BBcVQGljlyyzot03T6QT7IT7wcdDHR0Z/IimtiI0KtEo6OjRjSUdCspt1qWVLeY3ZRSx50GXU5d8fA9vz2dHmOas7hierV/nWOjosXZdi/C/0MpEwY9jouMpJTE1MdHQyIXKYukzisdHQ6AMZcwEVEab2ftV5ChzXEdD+/qI6Ohcv4S3x2+aNv7P9peUsH+lB5IY0NY6Ojny7NLOrHVjo6AA6scWpHR0QiKwzngo0JqSe7AL5wDa7Uo3b7FuRIPcEpHR0BjxWwD3hZ7qgX6Vq7AuF40qTT+UMGrYRdIZi7EHFsgdKJ2cOYjo6DEScmCpZZyIEqk1FI3WG9dAy3jTMZknPSlCM5UgGk2zsoQFRUpRmKXbuF+hZjw+Kh18joYpH2zAbgLGrNiTSle6C6x0dCIuZwj55sr2pY2l0dgZbTHAwAu3na6agYjIY/KOjouxRTu/sV5PRubLMoYYHCOjo4vlRXyIMehNtCZWsIpjmsdHR0sMUolcuz//Z",
    },
    {
      id: 3,
      name: "Эх, любимая тема! Моя любимый герой в Dota 2 - ... 😈",
      variants: ["Shadow Fiend", "Earthshaker", "Juggernaut", "Techies"],
      answer: "Shadow Fiend",
      url: "https://itzine.ru/wp-content/uploads/2021/10/dota-2.jpeg",
    },
    {
      id: 4,
      name: "А в Genshin?) 👹",
      variants: ["Ху Тао", "Кли", "Джун Ли", "Сяо"],
      answer: "Джун Ли",
      url: "https://variety.com/wp-content/uploads/2022/09/Genshin-Impact-Anime-Series-Concept.png?w=681&h=383&crop=1",
    },
    {
      id: 5,
      name: "Вот помнишь ли ты... в каком университете я учусь?! 🥸",
      variants: ["МИРЭА", "МТУСИ", "МИСИС", "МФТИ"],
      answer: "МТУСИ",
      url: "https://uploads-ssl.webflow.com/60babc2f4a97cece9858d8e7/61fdcbb783798aff9a450ca0_hq720.jpeg",
    },
    {
      id: 6,
      name: "Вид спорта, который мне нравится больше всего - ... 💪",
      variants: ["Футбол", "Пейнтбол", "Баскетбол", "Шахматы"],
      answer: "Баскетбол",
      url: "https://irecommend.ru/sites/default/files/product-images/3937/Awr2PN7B2pHYLheBoF4Hg.jpg",
    },
    {
      id: 7,
      name: "Аниме, которое мне зашло больше всего за этот год - ... 📺",
      variants: [
        "Фарфоровая кукла",
        "Клинок, рассекающий демонов",
        "Киберпанк: Бегущие по краю",
        "Человек-бензопила",
      ],
      answer: "Киберпанк: Бегущие по краю",
      url: "https://n1s1.hsmedia.ru/9f/ca/9b/9fca9b24e35ea35a8bb136cf270db3b0/600x600_1_ab29bd2d803b2e046dbb3651eddc2cda@1200x1200_0xac120003_12871686161669745111.png",
    },
    {
      id: 8,
      name: "На что я трачу большую часть свободного времени? 😶‍🌫️",
      variants: [
        "Играю",
        "Смотрю ютуб",
        "Самообразовываюсь",
        "Созваниваюсь с тобой в дискорде/тг",
      ],
      answer: "Смотрю ютуб",
      url: "https://image.myanimelist.net/ui/_3fYL8i6Q-n-155t3dn_4igICBYW99cZRlK3gkfnJrTm7gKlVrrgyc1RJSPtqH9Y",
    },
    {
      id: 9,
      name: "Что умиляет меня больше всего? 😊",
      variants: [
        "Детский мат",
        "Секс",
        "Подарок",
        "Обнимашки с тобой в кровати",
      ],
      answer: "Обнимашки с тобой в кровати",
      url: "https://sportshub.cbsistatic.com/i/2022/11/15/596d061f-dc3b-4862-8c6b-7ed4fc2a3904/chainsaw-man.jpg",
    },
    {
      id: 10,
      name: "За что я никогда не прощу человека? ",
      variants: [
        "Не вернул долг",
        "Не дал в долг",
        "Предательство",
        "Рукоприкладство",
      ],
      answer: "Предательство",
      url: "https://t3.ftcdn.net/jpg/05/00/85/04/360_F_500850425_KGzvN3zMn2Uif4Xa1eQDbV3bqgTNzA4H.jpg",
    },
  ]

  const modalMotion = {
    open: { opacity: 1, scale: 1 },
    closed: { opacity: 0, scale: 0 },
  }

  const dispatch = useTypedDispatch()
  const showQuestionPage = useTypedSelector(selectShowQuestionsPage)
  const page = useTypedSelector(selectPage)
  const [value, setValue] = useState("")

  const handleAnswerQuestion = (
    answer: string,
    correctAnswer: string,
    id: number
  ) => {
    if (answer === correctAnswer) {
      dispatch(increaseScore())
    }
    setValue("")
    if (id !== 10) {
      dispatch(setShowQuestionsPage(false))
      setTimeout(() => {
        dispatch(setShowQuestionsPage(true))
      }, 200)
      dispatch(nextPage())
    } else {
      dispatch(setShowFinalPage(true))
      dispatch(setShowQuestionsPage(false))
      dispatch(setShowTitlePage(false))
    }
  }

  return (
    <motion.div
      initial={"closed"}
      variants={modalMotion}
      animate={showQuestionPage ? "open" : "closed"}
      transition={{
        duration: 1.3,
        delay: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <Box
        bg="white"
        w="40vw"
        p={30}
        pb={50}
        sx={{
          position: "relative",
          borderRadius: 10,
        }}
      >
        {data
          .filter((question) => question.id === page)
          .map((question) => (
            <Box key={question.id}>
              <Title mb={15}>{question.name}</Title>

              <Flex justify="space-between" align="center">
                <Box>
                  <Radio.Group
                    orientation="vertical"
                    value={value}
                    onChange={(ans) => {
                      setValue(ans)
                    }}
                  >
                    <Radio
                      value={question.variants[0]}
                      label={question.variants[0]}
                    />
                    <Radio
                      value={question.variants[1]}
                      label={question.variants[1]}
                    />
                    <Radio
                      value={question.variants[2]}
                      label={question.variants[2]}
                    />
                    <Radio
                      value={question.variants[3]}
                      label={question.variants[3]}
                    />
                  </Radio.Group>
                  <motion.div
                    style={{ width: 60, height: 36 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Button
                      disabled={!value.length ? true : false}
                      mt={25}
                      color="pink"
                      onClick={() => {
                        handleAnswerQuestion(
                          value,
                          question.answer,
                          question.id
                        )
                      }}
                    >
                      Ответить
                    </Button>
                  </motion.div>
                </Box>
                <Image sx={{ width: "50% !important" }} src={question.url} />
              </Flex>
            </Box>
          ))}
      </Box>
    </motion.div>
  )
}

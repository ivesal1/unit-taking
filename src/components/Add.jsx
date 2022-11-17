
import { useState } from "react";
import { units } from "../api/units";
import './../assets/styles/add.css'

const Add = () => {
    const [unitName, setUnitName] = useState('')
    const [filterNames, setFiltersName] = useState([])
    const [showSuget, setShowSugest] = useState(false)

    return (
        <form onSubmit={e => e.preventDefault()} className="flex justify-center items-center pt-16">
            <div className="flex box-w flex-col items-center justify-end py-16 bg-white rounded-lg">
                <div className="text-right mb-4 w-3/4">
                    <span className="text-2xl font-black">دانشجو عزیز</span><br />  . لطفا نام درس مورد نظر را داخل کادر زیر وارد کنید و در انتها روی دکمه ثبت کلیک کنید
                    {
                        JSON.parse(localStorage.getItem('unit')) &&
                        <div>
                            <div style={{color: 'red'}}>
                                    شما انتخاب واحد خودرا انجام دادید 
                                    برای انتخاب مجدد دکمه زیر را بفشارید و صفحه را ریلود کنید
                                </div>
                                <button className="border px-4 py-1 mt-2 rounded-2xl" onClick={() => localStorage.clear()}>
                                    انتخاب واحد مجدد
                                </button>
                        </div>
                    }
                </div>
                <div className="flex flex-col justify-center items-center ">
                    <div className="flex flex-col justify-center w-full">
                        <div>
                            <input className="input bg-white border border-b h-9 w-96 text-right px-2 rounded-t-lg shadow" placeholder="نام درس" onChange={(e) => {
                                if (e.target.value == '') {
                                    setShowSugest(false)
                                } else {
                                    setUnitName(e.target.value)
                                    setShowSugest(true)
                                }
                                if (localStorage.getItem('unit')) {
                                    e.target.value = ''
                                    setShowSugest(false)
                                }
                            }} type="text" />
                        </div>
                        {
                            showSuget &&
                            <div className="shadow p-3 h-40 overflow-y-scroll rounded-b-lg bg-white">
                            {units.filter(({ name }, index) => {
                                return name.includes(unitName);
                            }).map((item, i) =>
                                <div className=" justify-between" key={item.id}>
                                    <div className="flex justify-end">
                                        <div>{item.unit} : تعداد واحد</div>
                                        <div className="mx-4 vertical-breaker"></div>
                                        <div>
                                            {item.name}
                                        </div>
                                        <div className="mx-4 vertical-breaker"></div>
                                        <button className="" onClick={() => {
                                            setFiltersName([...filterNames, item]);
                                        }}>انتخاب</button>
                                    </div>
                                    <div className="flex justify-center">
                                        <div style={{ height: 1, backgroundColor: '#cdcdcd',width:'100%'}} className="my-2"></div>
                                    </div>
                                </div>)}
                            </div>
                        }
                        </div>
                    
                </div>
                <div className="w-3/4 px-4">
                    {filterNames.map(({ id, name, masterName }, index) => {
                        return (
                        <div key={ id }>
                            {
                                filterNames.length > 0 && 
                                <div className="flex justify-center">
                                    <div className="my-4 horizental-breaker"></div>
                                </div>
                            }
                            <div className="flex items-center justify-between">
                                <div className="overflow-hidden">{ masterName }</div>
                                <div className="vertical-breaker"></div>
                                <div className="overflow-hidden">{ name }</div>
                                <div className="vertical-breaker"></div>
                                <div> کد درس: { id }</div>
                                <button onClick={() => setFiltersName(filterNames.filter((item, i) => {
                                    index != i
                                    localStorage.removeItem(index != i)
                            }))} className=""><img src="./pic/trash.svg"/></button>
                                </div>
                        </div>
                        )
                        
                    })}
                </div>
                {
                    filterNames.length > 0 &&
                    <div>
                        <button className="bg-blue-400 w-60 h-9 mt-8 rounded-lg" onClick={() => {
                                localStorage.setItem('unit', JSON.stringify(filterNames));
                            }} type="submit">
                            ثبت
                        </button>
                        <div className="text-center mt-2">
                            دکمه ثبت را بفشارید
                        </div>
                    </div>
                }
            </div>
        </form>
    );
}

export default Add;

/* eslint-disable no-unused-vars */
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import CustomScheduleForm from "./WorkingDays/CustomScheduleForm";
import GeneralScheduleForm from "./WorkingDays/GeneralScheduleForm";
import { useUpdateVendorProfile } from "../../../services/queries/vendor.query";
import isEqual from "lodash/isEqual";
import { isValidTime } from "../../../utils/convert24hrFormat";
import { to12HourFormat } from "../../../utils/convert12hr";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function BusinessHoursCard({
    workingDays: initialWorkingDays,
    dayWiseOpenAndClosingTime,
    vendorId,
    openingTime,
    closingTime,
}) {
    const { mutate: updateVendorProfile, isPending } = useUpdateVendorProfile();

    const [mode, setMode] = useState(Object.keys(dayWiseOpenAndClosingTime || {}).length === 0 ? "general" : "custom");
    const [generalTime, setGeneralTime] = useState({ from: openingTime || "09:00 AM", to: closingTime || "05:30 PM" });

    const [schedule, setSchedule] = useState(
        days.map((day) => {
            const time = dayWiseOpenAndClosingTime?.[day];
            return {
                day,
                active: !!time,
                from: time?.open || "09:00 AM",
                to: time?.close || "05:30 PM",
            };
        })
    );

    const updatedActiveDayWiseSchedule = schedule.reduce((acc, curr) => {
        console.log(schedule, "--schedule nsbsnsns");
        if (curr.active) {
            acc[curr.day] = { open: to12HourFormat(curr.from), close: to12HourFormat(curr.to) };
        }
        return acc;
    }, {});

    const hasChange = !isEqual(updatedActiveDayWiseSchedule, dayWiseOpenAndClosingTime);

    const handleUpdate = () => {
        console.log(updatedActiveDayWiseSchedule, "--test final");
        updateVendorProfile({
            vendorId,
            updatedData: {
                dayWiseOpenAndClosingTime: updatedActiveDayWiseSchedule,
                workingDays: schedule.reduce((acc, curr) => {
                    acc[curr.day] = !!curr.active;
                    return acc;
                }, {}),
            },
        });
    };

    const handleAllActiveDays = (selectedDays) => {
        // const fromTimeStr = convertTo24HourFormat(generalTime.from);
        // const toTimeStr = convertTo24HourFormat(generalTime.to);

        // const fromTime = new Date(`1970-01-01T${fromTimeStr}`);
        // const toTime = new Date(`1970-01-01T${toTimeStr}`);

        // if (fromTime >= toTime) {
        //   toast.error("Opening time must be earlier than closing time");
        //   return;
        // }

        updateVendorProfile({
            vendorId,
            updatedData: {
                openingTime: to12HourFormat(generalTime.from),
                closingTime: to12HourFormat(generalTime.to),
                workingDays: selectedDays,
            },
        });
    };

    if (isPending) return <div />;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-[1250px] w-full bg-white rounded-2xl shadow-md p-6 space-y-6"
        >
            <div className="flex justify-between items-center border-b pb-4">
                <div className="flex items-center gap-3">
                    <Button
                        disabled={Object.keys(dayWiseOpenAndClosingTime || {}).length !== 0}
                        variant={mode === "general" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setMode("general")}
                    >
                        General
                    </Button>
                    <Button
                        // disabled={mode === "general"}
                        variant={mode === "custom" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setMode("custom")}
                    >
                        Day-wise
                    </Button>
                </div>
            </div>

            {mode === "custom" ? (
                <CustomScheduleForm
                    schedule={schedule}
                    setSchedule={setSchedule}
                    handleUpdate={handleUpdate}
                    hasChange={hasChange}
                />
            ) : (
                <GeneralScheduleForm
                    initialWorkingDays={initialWorkingDays}
                    generalTime={generalTime}
                    setGeneralTime={setGeneralTime}
                    handleApply={handleAllActiveDays}
                />
            )}
        </motion.div>
    );
}
